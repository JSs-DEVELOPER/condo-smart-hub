
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Bell } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

interface NoticesListProps {
  notices: Notice[];
}

const NoticesList = ({ notices }: NoticesListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Comunicados Recentes</CardTitle>
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{notice.title}</h4>
                {notice.important && (
                  <Bell className="h-4 w-4 text-condo-red" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {notice.content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">{notice.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NoticesList;
