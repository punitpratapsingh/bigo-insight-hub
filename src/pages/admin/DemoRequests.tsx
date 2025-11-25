import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockDemoRequests = [
  { id: '1', name: 'Sarah Williams', email: 'sarah@example.com', company: 'Fashion Inc', product: 'LensVTO', date: '2024-01-23', status: 'Pending' },
  { id: '2', name: 'Mike Brown', email: 'mike@retail.com', company: 'Retail Co', product: 'LensSearch', date: '2024-01-22', status: 'Contacted' },
  { id: '3', name: 'Emma Davis', email: 'emma@shop.com', company: 'ShopWell', product: 'LensTag', date: '2024-01-21', status: 'Completed' },
];

const DemoRequests = () => {
  const [requests] = useState(mockDemoRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredRequests = requests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Demo request marked as ${newStatus}`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Demo Requests</h1>
          <p className="text-muted-foreground">Manage product demo requests from potential clients</p>
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search demo requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.name}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>{request.company}</TableCell>
                  <TableCell>{request.product}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      request.status === 'Pending' 
                        ? 'bg-chart-3/10 text-chart-3'
                        : request.status === 'Contacted'
                        ? 'bg-chart-1/10 text-chart-1'
                        : 'bg-chart-2/10 text-chart-2'
                    }`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleStatusChange(request.id, 'Contacted')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default DemoRequests;
