import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

const mockPricing = [
  { id: '1', name: 'Basic', price: 99, period: 'month', features: 'Up to 10,000 searches', product: 'LensSearch' },
  { id: '2', name: 'Pro', price: 299, period: 'month', features: 'Up to 100,000 searches', product: 'LensSearch' },
  { id: '3', name: 'Enterprise', price: 999, period: 'month', features: 'Unlimited searches', product: 'LensSearch' },
];

const Pricing = () => {
  const [pricing] = useState(mockPricing);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPricing = pricing.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Pricing Plans</h1>
            <p className="text-muted-foreground">Manage pricing tiers and features</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Pricing Plan</DialogTitle>
                <DialogDescription>Add a new pricing tier</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input id="name" placeholder="Basic, Pro, Enterprise..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product">Product</Label>
                  <Input id="product" placeholder="LensSearch, LensTag, etc." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="99" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="period">Period</Label>
                    <Input id="period" placeholder="month, year" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="features">Features</Label>
                  <Textarea id="features" placeholder="List key features..." rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button>Create Plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search pricing plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPricing.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.product}</TableCell>
                  <TableCell>
                    <span className="text-lg font-semibold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </TableCell>
                  <TableCell>{plan.features}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
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

export default Pricing;
