"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { postStore } from "@/shared/api";
import { StoreSchemaType, storeSchema } from "@/shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: postStore,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Store has been created!");
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
    onError: () => {
      toast.error("Error when creating store.");
    },
  });
  const form = useForm<StoreSchemaType>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: StoreSchemaType) => {
    mutate(data);
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="E-Commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-end space-x-2 pt-6">
              <Button variant="outline" onClick={onClose} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
