# QA Agent Protocols

## Flutter Analyze Protocol

1. **Run Analysis**
   ```bash
   cd projects/[name]
   flutter analyze --fatal-infos --fatal-warnings
   ```

2. **Parse Results**
   - Extract errors, warnings, hints
   - Map to source files and lines

3. **Auto-Fix**
   ```bash
   dart fix --apply
   ```

4. **Re-run** to verify

## Security Scan Protocol

1. **Secret Detection**
   ```regex
   patterns:
     - API_KEY.*=.*['"][A-Za-z0-9]{20,}['"]
     - PASSWORD.*=.*['"][^'"]+['"]
     - PRIVATE_KEY.*=.*['"]
     - firebase.*['"][A-Za-z0-9_-]{20,}['"]
   ```

2. **Dependency Check**
   ```bash
   flutter pub outdated
   ```
   Flag outdated packages with known vulnerabilities

3. **Config Review**
   - Check .env handling
   - Verify Firebase config files are gitignored
   - Ensure API keys come from environment

## Coverage Protocol

1. **Generate Coverage**
   ```bash
   flutter test --coverage
   ```

2. **Generate Report**
   ```bash
   genhtml coverage/lcov.info -o coverage/html
   ```

3. **Calculate**
   - Overall coverage percentage
   - Per-file coverage
   - Identify uncovered lines

## Code Review Protocol

1. **Structure Check**
   - Proper layering (presentation/domain/data)
   - Single responsibility per file
   - No God classes

2. **Naming Check**
   - Files: snake_case.dart
   - Classes: PascalCase
   - Methods: camelCase
   - Constants: SCREAMING_SNAKE_CASE

3. **Import Check**
   - No circular dependencies
   - Relative imports for same package
   - Package imports for external

## Revision Protocol

If QA fails:
1. Identify issue
2. Create REVISION message
3. Send to Orchestrator
4. Code agent fixes
5. Re-run QA (max 3 retries)

```json
{
  "type": "REVISION",
  "to": "code",
  "payload": {
    "issue": "lint_errors",
    "files": ["lib/widgets/task_card.dart"],
    "fix": "Remove unused import"
  }
}
```