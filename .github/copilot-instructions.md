# GitHub Copilot Instructions

## Overview

This document provides guidelines and best practices for using GitHub Copilot in projects. By following these instructions, you can ensure that Copilot generates high-quality, maintainable code that adheres to industry standards.

## Best Practices

### 1. Code Style

- **Consistent Formatting**: Ensure that your code is consistently formatted. Use tools like Prettier or Biome to automatically format your code.
- **Naming Conventions**: Use clear and descriptive names for variables, functions, and classes. Follow the appropriate naming conventions for your programming language.
- **Comments**: Write meaningful comments to explain complex logic or important sections of your code. Avoid redundant comments.

*For language-specific guidelines, see the corresponding files in the `.github/prompts/` directory.*

### 2. Project Structure

- **Modularization**: Organize your code into modules to improve maintainability and reusability. Each module should have a clear responsibility.
- **Directory Structure**: Follow a consistent directory structure that makes sense for your project and programming language.

### 3. Testing (Optional)

- **Conditional Testing**: Write tests only when a testing framework is included in the project's dependencies. Since this is a learning project, testing is not mandatory for all features.
- **When Testing is Appropriate**: Consider writing unit tests for critical functions and components to demonstrate testing practices.
- **Simple Test Coverage**: When tests are included, focus on covering key functionality rather than aiming for comprehensive test coverage.

### 4. Version Control

- **Commit Messages**: Write clear and concise commit messages that describe the changes made. Follow a consistent commit message format.
- **Branching Strategy**: Use a branching strategy like GitFlow or GitHub Flow to manage your codebase.

### 5. Documentation

- **README**: Keep your `README.md` up to date with instructions on how to set up and use the project.
- **API Documentation**: Document your API endpoints and functions using appropriate documentation tools for your language.

## Using GitHub Copilot

### 1. Prompting Copilot

- **Clear Prompts**: Provide clear and specific prompts to Copilot to get the best suggestions. For example, instead of writing "create a function", write "create a function that adds two numbers".
- **Context**: Provide enough context in your prompt so that Copilot understands the requirements. Include relevant code snippets or comments if necessary.

### 2. Reviewing Suggestions

- **Review Carefully**: Always review Copilot's suggestions carefully before accepting them. Ensure that the generated code meets your requirements and follows best practices.
- **Refine and Edit**: Feel free to refine and edit Copilot's suggestions to better fit your needs. Use the suggestions as a starting point and make necessary adjustments.

### 3. Learning from Copilot

- **Explore Suggestions**: Use Copilot's suggestions as an opportunity to learn new coding techniques and best practices. Pay attention to the patterns and idioms used in the generated code.
- **Ask for Explanations**: If you're unsure about a suggestion, ask Copilot for an explanation or clarification. This can help you understand the reasoning behind the generated code.

## Conclusion

By following these best practices and guidelines, you can effectively use GitHub Copilot to enhance your projects. Remember to always review and refine the generated code to ensure it meets your standards and requirements. For language-specific guidelines, refer to the corresponding files in the `.github/prompts/` directory.
