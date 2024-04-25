'use client'

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  description: string;
  stock: number;
};

export default function UpdateProduct(product: Product) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [stock, setStock] = useState(product.stock);

  const url = process.env.API_URL || "http://localhost:8000";
  const router = useRouter();

  async function updateProduct(e: SyntheticEvent) {
    e.preventDefault();

    await axios.patch(`${url}/products/${product.id}`, { description, stock })
      .then(() => {
        toast.success("Product updated successfully");
        window.location.reload()
      })
      .catch(() => {
        toast.error("An error occurred while updating your product");
      });
  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {product.name}</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={updateProduct}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"

              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 min-h-32" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}