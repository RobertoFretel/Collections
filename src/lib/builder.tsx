import type { SchemaTypes } from '@pothos/core';

// Definiamo il tipo esatto per la callback 'fields' usando PothosSchemaTypes
export type QueryFieldsFn<Types extends SchemaTypes> = (
  t: PothosSchemaTypes.QueryFieldBuilder<Types, {}>
) => Record<string, any>;

interface CollectionOptions<Types extends SchemaTypes> {
  name: string;
  schema: {
    fields?: QueryFieldsFn<Types>;
  };
}

export class Collection<Types extends SchemaTypes> {
  constructor(public config: CollectionOptions<Types>) {}

  register(builder: PothosSchemaTypes.SchemaBuilder<any>) {
    if (this.config.schema.fields) {
      // Cast sicuro interno per Pothos
      builder.queryFields(this.config.schema.fields as any);
    }
  }
}

export function defineCollection<
  Types extends SchemaTypes
>(config: CollectionOptions<Types>) {
  return new Collection<Types>(config);
}