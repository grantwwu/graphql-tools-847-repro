import gql from "graphql-tag";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

const item = makeExecutableSchema({
  typeDefs: `
type Item {
  name: Int
}`});

const extendingSchemaGQLTag = gql`
type Query {
  findItemCostMoreThan(giveCost: Float): [Item]
}`;

// This works because makeExecutableSchema defines (in the returned GraphQLSchema) all basic types used.
const extendingSchemaGQLMES = makeExecutableSchema({
  typeDefs: `
type Query {
  findItemCostMoreThan(giveCost: Float): [Float]
}`});

// This works...
mergeSchemas({ schemas: [item, extendingSchemaGQLMES] });


console.log();
console.log("This doesn't work because makeExecutableSchema seems to require " +
  "a self-contained schema - this refers to Item, which isn't defined here");
try {
  makeExecutableSchema({
    typeDefs: `
  type Query {
    findItemCostMoreThan(giveCost: Float): [Item]
  }`});
} catch (err) {
  console.error(err);
}

console.log();
console.log("This doesn't work, because the gql tag doesn't seem to properly define the Float type");
mergeSchemas({ schemas: [item, extendingSchemaGQLTag] });
