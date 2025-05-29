# TypeScript Basics

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing, classes, and modules to JavaScript, making it easier to write and maintain large-scale applications. This guide covers the fundamental concepts of TypeScript with detailed explanations and practical examples.

## Table of Contents

- [Basic Types](#basic-types)
- [Type Annotations](#type-annotations)
- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Generics](#generics)
- [Enums](#enums)
- [Type Assertions](#type-assertions)
- [Type Guards](#type-guards)
- [Advanced Types](#advanced-types)
- [Modules](#modules)
- [Decorators](#decorators)

## Basic Types

TypeScript includes all the basic types from JavaScript plus additional type definitions. Understanding these types is crucial for writing type-safe code:

### Primitive Types

```typescript
// Boolean - represents true/false values
// Use boolean type when you need to represent a logical value
let isDone: boolean = false;
let isActive: boolean = true;

// Number - represents both integer and floating-point numbers
// TypeScript supports various number formats including decimal, hex, binary, and octal
let decimal: number = 6;
let hex: number = 0xf00d; // Hexadecimal number (61453 in decimal)
let binary: number = 0b1010; // Binary number (10 in decimal)
let octal: number = 0o744; // Octal number (484 in decimal)
let float: number = 3.14; // Floating point number
let scientific: number = 3.14e2; // Scientific notation (314)

// String - represents text data
// TypeScript supports both single quotes, double quotes, and template literals
let color: string = "blue";
let fullName: string = `Bob Bobbington`;
let age: number = 37;
// Template literals allow embedding expressions using ${}
let sentence: string = `Hello, my name is ${fullName}. I'll be ${
  age + 1
} years old next month.`;
```

### Complex Types

```typescript
// Array - represents a list of values
// TypeScript provides two ways to declare array types
let list: number[] = [1, 2, 3]; // Using square brackets
let list2: Array<number> = [1, 2, 3]; // Using generic array type
let mixed: (string | number)[] = ["hello", 42]; // Union type array

// Tuple - represents an array with a fixed number of elements
// Each element can have a different type
let x: [string, number];
x = ["hello", 10]; // OK - matches the type definition
x = [10, "hello"]; // Error - type mismatch
x = ["hello", 10, "world"]; // Error - too many elements

// Enum - represents a set of named constants
// Enums can be numeric or string-based
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
// Numeric enums can be used as both values and types
let favoriteColor: Color = Color.Blue;
console.log(Color[favoriteColor]); // "Blue"

// Any - represents any type (use sparingly)
// 'any' type should be avoided when possible as it bypasses type checking
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
// Useful when dealing with third-party libraries or dynamic content
function processData(data: any) {
  // Type checking is disabled for 'any' type
  console.log(data.someProperty);
}

// Void - represents the absence of a type
// Commonly used for functions that don't return a value
function warnUser(): void {
  console.log("This is my warning message");
}
// Variables of type void can only be assigned undefined or null
let unusable: void = undefined;

// Null and Undefined - represent null and undefined values
// These types are subtypes of all other types
let u: undefined = undefined;
let n: null = null;
let num: number = undefined; // OK
let str: string = null; // OK

// Never - represents values that never occur
// Useful for functions that always throw an error
function error(message: string): never {
  throw new Error(message);
}
// Useful for exhaustive type checking
function exhaustiveCheck(x: never): never {
  throw new Error("Unexpected object: " + x);
}

// Object - represents any non-primitive type
// Use this type when you want to accept any non-primitive value
declare function create(o: object | null): void;
create({ prop: 0 }); // OK - object literal
create(null); // OK - null
create(42); // Error - number is a primitive type
```

## Type Annotations

TypeScript allows you to explicitly specify types for variables, function parameters, and return values. This helps catch errors early and provides better IDE support:

```typescript
// Variable type annotations
// Explicitly declaring types for variables
let name: string = "John";
let age: number = 30;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "gaming"];
let person: { name: string; age: number } = { name: "John", age: 30 };

// Function parameter and return type annotations
// Specify types for parameters and return value
function add(x: number, y: number): number {
  return x + y;
}

// Optional parameters - marked with ?
// Parameters that may or may not be provided
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return firstName + " " + lastName;
  }
  return firstName;
}
buildName("John"); // OK - lastName is optional
buildName("John", "Doe"); // OK - lastName is provided

// Default parameters - provide default values
// Parameters with default values
function buildName2(firstName: string, lastName: string = "Smith"): string {
  return firstName + " " + lastName;
}
buildName2("John"); // "John Smith" - uses default value
buildName2("John", "Doe"); // "John Doe" - overrides default value

// Rest parameters - collect remaining arguments
// Collects all remaining arguments into an array
function buildName3(firstName: string, ...restOfName: string[]): string {
  return firstName + " " + restOfName.join(" ");
}
buildName3("John", "Doe", "Smith"); // "John Doe Smith"

// Function type annotations
// Define types for function expressions
type MathFunc = (x: number, y: number) => number;
const multiply: MathFunc = (x, y) => x * y;
```

## Interfaces

Interfaces define contracts for object shapes. They are powerful tools for defining custom types and ensuring type safety:

```typescript
// Basic interface
// Defines the shape of an object with required properties
interface User {
  name: string;
  age: number;
}
const user: User = { name: "John", age: 30 };

// Optional properties - marked with ?
// Properties that may or may not be present
interface SquareConfig {
  color?: string;
  width?: number;
}
const config: SquareConfig = { color: "red" }; // OK
const config2: SquareConfig = {}; // OK - all properties are optional

// Read-only properties - marked with readonly
// Properties that cannot be modified after initialization
interface Point {
  readonly x: number;
  readonly y: number;
}
const point: Point = { x: 10, y: 20 };
point.x = 20; // Error - cannot modify readonly property

// Function types
// Define the shape of a function
interface SearchFunc {
  (source: string, subString: string): boolean;
}
const search: SearchFunc = (source, subString) => {
  return source.includes(subString);
};

// Class types
// Define the shape of a class
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// Extending interfaces
// Create new interfaces by extending existing ones
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
const square: Square = { color: "red", sideLength: 10 };

// Implementing interfaces
// Classes can implement interfaces
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}

// Interface merging
// Interfaces with the same name are merged
interface Box {
  height: number;
  width: number;
}
interface Box {
  scale: number;
}
// Resulting interface:
// interface Box {
//   height: number;
//   width: number;
//   scale: number;
// }
```

## Type Aliases

Type aliases create new names for types. They are similar to interfaces but can be used for primitive types, unions, and intersections:

```typescript
// Basic type aliases
// Create new names for existing types
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

// Generic types
// Create reusable type aliases with type parameters
type Container<T> = { value: T };
const numberContainer: Container<number> = { value: 42 };
const stringContainer: Container<string> = { value: "hello" };

// Union types
// Create types that can be one of several types
type StringOrNumber = string | number;
function process(value: StringOrNumber) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// Intersection types
// Combine multiple types into one
type Combined = { id: number } & { name: string };
const combined: Combined = { id: 1, name: "John" };

// Type aliases vs Interfaces
// Type aliases can be used for primitive types
type StringOrNumber = string | number;
// Interfaces can only be used for object types
interface StringOrNumber {} // Error

// Type aliases can be used for unions and intersections
type UnionType = string | number;
type IntersectionType = { id: number } & { name: string };
```

## Generics

Generics allow you to write reusable components that work with multiple types. They provide type safety while maintaining flexibility:

```typescript
// Generic function
// Create functions that work with multiple types
function identity<T>(arg: T): T {
  return arg;
}
const num = identity<number>(42);
const str = identity<string>("hello");

// Generic interface
// Create interfaces that work with multiple types
interface GenericIdentityFn<T> {
  (arg: T): T;
}
const myIdentity: GenericIdentityFn<number> = identity;

// Generic class
// Create classes that work with multiple types
class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}
const numberClass = new GenericNumber<number>();
numberClass.zeroValue = 0;
numberClass.add = (x, y) => x + y;

// Generic constraints
// Restrict the types that can be used with generics
interface Lengthwise {
  length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity("hello"); // OK - string has length
loggingIdentity([1, 2, 3]); // OK - array has length
loggingIdentity(42); // Error - number doesn't have length

// Using class types in generics
// Create instances of classes using generics
function create<T>(c: { new (): T }): T {
  return new c();
}
class Example {}
const example = create(Example);

// Generic constraints with multiple types
// Restrict generics to types that implement multiple interfaces
interface Printable {
  print(): void;
}
interface Loggable {
  log(): void;
}
function extend<T extends Printable & Loggable>(first: T, second: T): T {
  first.print();
  second.log();
  return first;
}
```

## Enums

Enums allow you to define a set of named constants. They can be numeric or string-based:

```typescript
// Numeric enums
// Automatically increment values if not specified
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
// Direction.Up = 1
// Direction.Down = 2
// Direction.Left = 3
// Direction.Right = 4

// String enums
// Each member must be explicitly initialized
enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

// Heterogeneous enums
// Mix of numeric and string values (not recommended)
enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// Computed and constant members
// Use bitwise operations for flags
enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
}

// Bitwise Operators Explanation
// << (Left Shift) - shifts bits to the left
// Example: 1 << 1
// Binary: 0001 -> 0010 (1 -> 2 in decimal)
// 1 << 2 means shift 1 two bits to the left
// Binary: 0001 -> 0100 (1 -> 4 in decimal)
//
// >> (Right Shift) - shifts bits to the right
// Example: 4 >> 1
// Binary: 0100 -> 0010 (4 -> 2 in decimal)
//
// | (Bitwise OR) - combines bits
// Example: 2 | 4
// Binary: 0010 | 0100 = 0110 (2 | 4 = 6 in decimal)
//
// In the FileAccess enum:
// None = 0      (0000) - no permissions
// Read = 2      (0010) - read permission
// Write = 4     (0100) - write permission
// ReadWrite = 6 (0110) - both read and write permissions
//
// This is commonly used for creating "bit masks" or "flags"
// where each bit represents a specific permission or property.
// It's an efficient way to store multiple boolean values in a single number.

// Using enums
function move(direction: Direction) {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    // ... handle other cases
  }
}

// Example of using bitwise flags
function checkFileAccess(access: FileAccess) {
  if (access & FileAccess.Read) {
    console.log("Can read");
  }
  if (access & FileAccess.Write) {
    console.log("Can write");
  }
}

// Usage examples
const readOnly = FileAccess.Read; // 2 (0010)
const writeOnly = FileAccess.Write; // 4 (0100)
const readWrite = FileAccess.ReadWrite; // 6 (0110)

checkFileAccess(readOnly); // "Can read"
checkFileAccess(writeOnly); // "Can write"
checkFileAccess(readWrite); // "Can read" "Can write"
```

## Type Assertions

Type assertions tell TypeScript that you know more about a type than it does. Use them carefully as they bypass type checking:

```typescript
// Angle-bracket syntax
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as-syntax (preferred in JSX)
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;

// const assertions
let x = "hello" as const;
type X = typeof x; // type "hello"

// Type assertions with objects
interface User {
  name: string;
  age: number;
}
const userData = { name: "John", age: 30 } as User;

// Type assertions with arrays
const numbers = [1, 2, 3] as const;
type Numbers = typeof numbers; // readonly [1, 2, 3]
```

## Type Guards

Type guards help narrow down types within conditional blocks. They are essential for type safety:

```typescript
// typeof type guards
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof type guards
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

function isDog(animal: Animal): animal is Dog {
  return animal instanceof Dog;
}

// Property checks
interface A {
  a: number;
}

interface B {
  b: string;
}

function isA(x: A | B): x is A {
  return "a" in x;
}

// Type predicates
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Using type guards
function processValue(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  }
}
```

## Advanced Types

### Union Types

Union types allow a value to be one of several types:

```typescript
type StringOrNumber = string | number;

function process(value: StringOrNumber) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// Union types with literals
type Direction = "North" | "South" | "East" | "West";
function move(direction: Direction) {
  switch (direction) {
    case "North":
      console.log("Moving north");
      break;
    // ... handle other cases
  }
}
```

### Intersection Types

Intersection types combine multiple types into one:

```typescript
type Combined = { id: number } & { name: string };
const combined: Combined = { id: 1, name: "John" };

// Intersection with interfaces
interface Printable {
  print(): void;
}
interface Loggable {
  log(): void;
}
type PrintableAndLoggable = Printable & Loggable;
```

### Mapped Types

Mapped types allow you to create new types based on old ones:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;
// Result:
// {
//   readonly name: string;
//   readonly age: number;
// }

// Partial<T> makes all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Pick<T,K> constructs a type by picking the set of properties K from T
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

### Conditional Types

Conditional types help create types that depend on other types:

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type StringOrNumber = string | number;
type NonNullableStringOrNumber = NonNullable<StringOrNumber>;

// Type inference in conditional types
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";
```

## Modules

TypeScript supports modules for organizing code:

```typescript
// math.ts
export interface MathInterface {
  add(x: number, y: number): number;
  subtract(x: number, y: number): number;
}

export class Math implements MathInterface {
  add(x: number, y: number): number {
    return x + y;
  }

  subtract(x: number, y: number): number {
    return x - y;
  }
}

// main.ts
import { Math, MathInterface } from "./math";

// Default exports
export default class Calculator {
  // ...
}

// Namespace imports
import * as MathModule from "./math";

// Renaming imports
import { Math as MathClass } from "./math";
```

## Decorators

Decorators are a way to add both annotations and a meta-programming syntax for class declarations and members:

```typescript
// Class decorator
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Example {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}

// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Result:`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(x: number, y: number): number {
    return x + y;
  }
}

// Property decorator
function readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false,
  });
}

class Example2 {
  @readonly
  name: string = "John";
}
```

## Useful Links

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
