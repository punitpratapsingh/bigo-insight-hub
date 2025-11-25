import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash2, Download } from "lucide-react";
import { useState } from "react";

const mockSubscribers = [
  { id: '1', email: 'user1@example.com', name: 'John Doe', date: '2024-01-25', status: 'Active' },
  { id: '2', email: 'user2@example.com', name: 'Jane Smith', date: '2024-01-24', status: 'Active' },
  { id: '3', email: 'user3@example.com', name: 'Bob Johnson', date: '2024-01-23', status: 'Active' },
];

const Newsletter = () => {
  const [subscribers] = useState(mockSubscribers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubscribers = subscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    console.log('Exporting newsletter subscribers...');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
            <p className="text-muted-foreground">Manage your email newsletter list</p>
          </div>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground">Total Subscribers</div>
            <div className="text-3xl font-bold mt-2">{subscribers.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground">Active Subscribers</div>
            <div className="text-3xl font-bold mt-2">{subscribers.filter(s => s.status === 'Active').length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground">This Month</div>
            <div className="text-3xl font-bold mt-2">+24</div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subscribed Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell>{sub.name}</TableCell>
                  <TableCell>{sub.date}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-chart-2/10 text-chart-2">
                      {sub.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Newsletter;
