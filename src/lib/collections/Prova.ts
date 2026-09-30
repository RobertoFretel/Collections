import { defineCollection } from "../builder";

export const Prova = defineCollection({
  name: "prova",
  schema: {
    fields: (t) => ({
      hello: t.string({
        args: {
          name: t.arg.string()
        },
        resolve: (_parent, { name }) => `hello ${name ?? "world"}!`
      })
    })
  }
})

