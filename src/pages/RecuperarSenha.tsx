
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const emailSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'O código deve ter 6 dígitos' }),
});

const passwordSchema = z.object({
  password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const RecuperarSenha = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });
  
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });
  
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitEmail = (data: EmailFormValues) => {
    console.log('Recuperar senha para:', data.email);
    
    // Simulação de envio de e-mail com código
    toast({
      title: 'Código enviado!',
      description: `Enviamos um código de 6 dígitos para ${data.email}`,
    });
    
    setStep('otp');
  };
  
  const onSubmitOtp = (data: OtpFormValues) => {
    console.log('Código OTP:', data.otp);
    
    // Simulação de verificação de código
    if (data.otp === '123456') {
      toast({
        title: 'Código válido!',
        description: 'Agora você pode definir uma nova senha',
      });
      setStep('password');
    } else {
      toast({
        title: 'Código inválido',
        description: 'Por favor, verifique o código e tente novamente',
        variant: 'destructive',
      });
    }
  };
  
  const onSubmitPassword = (data: PasswordFormValues) => {
    console.log('Nova senha:', data.password);
    
    // Simulação de alteração de senha
    toast({
      title: 'Senha alterada com sucesso!',
      description: 'Você já pode fazer login com sua nova senha',
    });
    
    // Em um app real, redirecionaria para a página de login
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full py-4 px-6 flex justify-between items-center">
        <Link to="/login" className="text-primary hover:underline">
          ← Voltar para login
        </Link>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border border-border">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-1">Recuperar Senha</h1>
            <p className="text-muted-foreground">
              {step === 'email' && 'Informe seu e-mail para receber o código de recuperação'}
              {step === 'otp' && 'Digite o código de 6 dígitos enviado para seu e-mail'}
              {step === 'password' && 'Defina sua nova senha'}
            </p>
          </div>
          
          {step === 'email' && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Enviar código
                </Button>
              </form>
            </Form>
          )}
          
          {step === 'otp' && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="space-y-4">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center space-y-2">
                      <FormLabel>Código de verificação</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep('email')}>
                    Voltar
                  </Button>
                  <Button type="submit">
                    Verificar
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          {step === 'password' && (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Nova Senha</FormLabel>
                      <FormControl>
                        <Input placeholder="********" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep('otp')}>
                    Voltar
                  </Button>
                  <Button type="submit">
                    Salvar nova senha
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecuperarSenha;
