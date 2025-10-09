# Feature Implementation Workflow

This document provides a systematic approach for implementing complex software features in a bug-free and well-tested manner. Follow this process strictly, step by step, without skipping or merging phases.

## When to Use This Workflow

Use this systematic approach when:
- Implementing complex features that span multiple components
- Building critical functionality that requires thorough testing
- Working on features with unclear or evolving requirements
- Developing features that need careful architectural planning
- Creating reusable components or services

## The 6-Step Workflow

### Step 1: Requirements Analysis
**Goal**: Fully understand what needs to be built before writing any code.

- Summarize the feature in your own words
- List functional requirements (what the feature must do)
- List non-functional requirements (performance, security, UX, etc.)
- Identify edge cases and error scenarios
- Ask clarifying questions if anything is unclear
- **Do not proceed until requirements are explicit and validated**

### Step 2: Architecture & Design
**Goal**: Design a robust, maintainable solution before implementation.

- Break down the feature into logical modules/components
- Define clear interfaces, dependencies, and data flows
- Consider design patterns that fit the problem
- Highlight design trade-offs:
  - Performance vs. maintainability
  - Flexibility vs. simplicity
  - Development speed vs. scalability
- Avoid unnecessary mocks — prefer real testable components (e.g., in-memory DBs, test doubles)
- Document API contracts and data schemas

### Step 3: Test Planning
**Goal**: Define comprehensive tests before writing implementation code.

- **Acceptance Tests**: Write in Gherkin-style (Given/When/Then)
  ```gherkin
  Given a user is logged in
  When they click the profile button
  Then they should see their profile information
  ```
- **Property-Based Tests**: Design tests for variable/random input
- **Integration Tests**: Test real component interactions with minimal mocking
- **Unit Tests**: Test individual functions and edge cases
- **Error Handling Tests**: Verify graceful failure scenarios
- Define how test coverage will be measured
- Specify performance benchmarks if applicable

### Step 4: Iterative Implementation
**Goal**: Build the feature incrementally with continuous validation.

- **Check for suitable sub-agents** for implementation tasks
- Implement the feature module by module
- For each module:
  1. Restate requirements for that specific module
  2. Write tests first (TDD approach)
  3. Implement the minimal code to pass tests
  4. Refactor for clarity and performance
  5. Run tests and verify all pass
  6. Document the module's API and usage
- Ensure each iteration leaves the system in a working state
- Commit working code frequently

### Step 5: Self-Review & Quality Checks
**Goal**: Ensure code meets senior-level quality standards.

- **Static Analysis**:
  - Run linting tools (ESLint, etc.)
  - Check TypeScript type safety
  - Identify code smells
- **Code Quality Review**:
  - Check for DRY violations
  - Verify naming conventions
  - Ensure clear logic flow
  - Look for performance bottlenecks
- **Test Quality**:
  - Ensure tests are meaningful (no trivial asserts)
  - Verify tests aren't brittle or hardcoded
  - Check test isolation and independence
- **Documentation**:
  - Verify inline comments for complex logic
  - Update README if needed
  - Ensure API documentation is complete
- Refactor and improve until quality standards are met

### Step 6: Final Validation
**Goal**: Confirm the implementation fully satisfies all requirements.

- Run the complete test suite
- Report coverage metrics (aim for >80% for critical features)
- Demonstrate edge-case handling with specific test results
- Verify all functional requirements are met
- Confirm non-functional requirements (performance, security, etc.)
- Create a summary of:
  - What was implemented
  - How it was tested
  - Any remaining limitations or future improvements

### Post-Implementation Cleanup (Required)
After Final Validation, run the LLM Clean Command to perform a code review-first cleanup and documentation pass for the changes you made. See `LLM_CLEAN_COMMAND.md` and use the provided invocation. Keep the cleanup narrowly scoped to your work and follow the repo standards in `AGENTS.md`.

## Best Practices

### Testing Philosophy
- **Tests must be meaningful**: No trivial asserts like `expect(true).toBe(true)`
- **Tests must be maintainable**: Avoid hardcoded values that break with minor changes
- **Tests must be independent**: Each test should run in isolation
- **Prefer integration over unit tests**: Test behavior, not implementation details

### Implementation Guidelines
- **Iterate, don't rush**: Build incrementally and validate continuously
- **Think before coding**: Spend time on design to avoid costly refactoring
- **Document decisions**: Explain why, not just what
- **Handle errors gracefully**: Every external call should have error handling
- **Keep it simple**: Choose the simplest solution that meets requirements

### Communication
- **Be transparent**: Report progress, blockers, and concerns promptly
- **Ask questions**: Unclear requirements lead to wrong implementations
- **Show your work**: Demonstrate test results and validation steps
- **Update stakeholders**: If requirements change, update all affected documentation

## Example Usage

When asked to implement a feature, follow this template:

```markdown
## Feature: [Feature Name]

### Step 1: Requirements Analysis
[Document requirements]

### Step 2: Architecture & Design
[Design decisions and diagrams]

### Step 3: Test Planning
[Test scenarios and strategies]

### Step 4: Iterative Implementation
[Module-by-module implementation]

### Step 5: Self-Review & Quality Checks
[Quality assurance results]

### Step 6: Final Validation
[Validation results and summary]
```

## Important Rules

- **DO NOT** jump directly to implementation
- **DO NOT** skip test planning
- **DO NOT** merge steps to save time
- **ALWAYS** validate each step before proceeding
- **ALWAYS** think about edge cases and error scenarios
- **ALWAYS** maintain the system in a working state

This systematic approach ensures high-quality, maintainable, and well-tested features that meet requirements and stand the test of time.
