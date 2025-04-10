# TypeScript Guidelines for GitHub Copilot

## TypeScript Best Practices

### 1. Code Style

- **Arrow Functions**: When defining functions, use arrow functions (`=>` syntax) by default. This preserves the `this` context and results in more concise code. Examples:
  ```typescript
  // Recommended
  const add = (a: number, b: number): number => a + b;

  // For multi-line functions
  const calculate = (a: number, b: number): number => {
    const result = a * b;
    return result + 10;
  };

  // Avoid traditional function declarations when possible
  // function add(a: number, b: number): number {
  //   return a + b;
  // }
  ```

### 2. TypeScript Specific

- **Strict Type Checking**: Enable strict type checking in your `tsconfig.json` to catch potential errors early.
- **Type Annotations**: Use type annotations to explicitly define the types of variables, function parameters, and return values.
- **Avoid `any` Type**: Avoid using the `any` type as it defeats the purpose of TypeScript's type checking. Instead, use proper types, interfaces, or generic types. If the exact type is not known, consider using `unknown` as a safer alternative:
  ```typescript
  // Avoid
  const processData = (data: any): any => {
    // ...
  };

  // Prefer
  interface DataInput {
    id: number;
    name: string;
  }

  interface ProcessedResult {
    success: boolean;
    result: string;
  }

  const processData = (data: DataInput): ProcessedResult => {
    // ...
  };

  // If type is truly unknown, use 'unknown' instead of 'any'
  const parseUnknownData = (data: unknown): void => {
    // Type checking required before operations
    if (typeof data === 'string') {
      // Now TypeScript knows it's a string
      console.log(data.toLowerCase());
    }
  };
  ```
- **Interfaces and Types**: Use interfaces and types to define the shape of objects and function signatures.

### 3. Testing in TypeScript Projects

- **TypeScript Testing Frameworks**: When writing tests for TypeScript code, use appropriate testing frameworks like Jest or Vitest that have good TypeScript support.
- **Type Testing**: Consider testing types with libraries like `tsd` or TypeScript's built-in `expectType` utility when appropriate.
- **Mocking Typed Dependencies**: When mocking dependencies in tests, ensure that the mock implementations respect the original TypeScript interfaces.
