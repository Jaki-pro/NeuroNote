import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteservices } from "../services";

export const useCreateNoteMutation = () => {
  //const queryClient = useQueryClient();

  return useMutation({
    mutationFn: noteservices.createNote, 
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["notes"] });
    // },
    // onError: (error: unknown) => {
    //   console.error("Error creating note:", error);
    // },
  });
}