import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const perfilSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  telefone: z.string().min(10, { message: 'Digite um número de telefone válido' }),
  apartamento: z.string().min(1, { message: 'Informe o número do apartamento' }),
  bloco: z.string().optional(),
});

const senhaSchema = z.object({
  senhaAtual: z.string().min(1, { message: 'Digite sua senha atual' }),
  novaSenha: z.string().min(8, { message: 'A nova senha deve ter pelo menos 8 caracteres' }),
  confirmarSenha: z.string(),
}).refine((data) => data.novaSenha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type PerfilFormValues = z.infer<typeof perfilSchema>;
type SenhaFormValues = z.infer<typeof senhaSchema>;

const Perfil = () => {
  const perfilForm = useForm<PerfilFormValues>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      telefone: '(11) 98765-4321',
      apartamento: '101',
      bloco: 'A',
    },
  });
  
  const senhaForm = useForm<SenhaFormValues>({
    resolver: zodResolver(senhaSchema),
    defaultValues: {
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    },
  });

  const onSubmitPerfil = (data: PerfilFormValues) => {
    console.log('Atualização de perfil:', data);
    
    toast({
      title: 'Perfil atualizado!',
      description: 'Suas informações foram atualizadas com sucesso.',
    });
  };
  
  const onSubmitSenha = (data: SenhaFormValues) => {
    console.log('Alteração de senha:', data);
    
    toast({
      title: 'Senha alterada!',
      description: 'Sua senha foi alterada com sucesso.',
    });
    
    senhaForm.reset({
      senhaAtual: '',
      novaSenha: '',
      confirmarSenha: '',
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Avatar className="h-20 w-20 mr-6">
            <AvatarImage src="" />
            <AvatarFallback className="text-xl">JS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Meu Perfil</h1>
            <p className="text-muted-foreground">
              Gerencie suas informações pessoais e configurações
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="informacoes">
          <TabsList className="mb-6">
            <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
            <TabsTrigger value="preferencias">Preferências</TabsTrigger>
          </TabsList>
          
          <TabsContent value="informacoes">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Atualize suas informações pessoais. Esses dados serão visíveis para a administração do condomínio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...perfilForm}>
                  <form onSubmit={perfilForm.handleSubmit(onSubmitPerfil)} className="space-y-4">
                    <FormField
                      control={perfilForm.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={perfilForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={perfilForm.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={perfilForm.control}
                        name="apartamento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apartamento</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={perfilForm.control}
                        name="bloco"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bloco</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <CardFooter className="px-0 pt-4">
                      <Button type="submit">Salvar Alterações</Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
                <CardDescription>
                  Altere sua senha e gerencie as configurações de segurança da sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...senhaForm}>
                  <form onSubmit={senhaForm.handleSubmit(onSubmitSenha)} className="space-y-4">
                    <FormField
                      control={senhaForm.control}
                      name="senhaAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha Atual</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={senhaForm.control}
                      name="novaSenha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nova Senha</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={senhaForm.control}
                      name="confirmarSenha"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar Nova Senha</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <CardFooter className="px-0 pt-4">
                      <Button type="submit">Alterar Senha</Button>
                    </CardFooter>
                  </form>
                </Form>
                
                <Separator className="my-6" />
                
                <div>
                  <h3 className="font-medium mb-2">Dispositivos Conectados</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Estes são os dispositivos que têm acesso à sua conta.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Chrome em Windows</p>
                        <p className="text-sm text-muted-foreground">São Paulo, Brasil • Último acesso agora</p>
                      </div>
                      <Button variant="ghost" size="sm">Este dispositivo</Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">Safari em iPhone</p>
                        <p className="text-sm text-muted-foreground">São Paulo, Brasil • Último acesso: 2 dias atrás</p>
                      </div>
                      <Button variant="outline" size="sm">Remover</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferencias">
            <Card>
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>
                  Personalize sua experiência no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Notificações</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure como deseja receber notificações do sistema.
                    </p>
                    
                    {/* Aqui viriam as configurações de notificações */}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Idioma e Região</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure o idioma e o formato de data e hora.
                    </p>
                    
                    {/* Aqui viriam as configurações de idioma e região */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Perfil;
