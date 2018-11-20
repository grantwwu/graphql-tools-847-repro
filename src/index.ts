import gql from "graphql-tag";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

const item = makeExecutableSchema({
  typeDefs: `
type Item {
  name: String
}`});

const extendingSchemaGQLTag = gql`
extend type Item {
  cost: Float
}
type Query {
  findItemCostMoreThan(giveCost: Float): [Item]
}`;

mergeSchemas({ schemas: [item, extendingSchemaGQLTag] });
