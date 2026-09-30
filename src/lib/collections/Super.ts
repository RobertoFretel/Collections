import { defineCollection } from "../builder";

export const Super = defineCollection({
  name: "super",
  schema: {
    fields: (t) => ({
      super: t.string({
        args: {
          eroe: t.arg.string()
        },
        resolve: (_parent, { eroe }) => `${eroe}man!`
      })
    })
  }
})

