import { z } from "zod";

export const AcceptMessageSchema = z.object({
    acceptMesssages: z.boolean()
});
