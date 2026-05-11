#!/bin/bash

# Git hooks for Flutter projects

# Get the hooks directory
HOOKS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../.git/hooks && pwd)"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && cd ../../.. && pwd)"

# Create hooks if they don't exist
mkdir -p "$HOOKS_DIR"

# Pre-commit hook
cat > "$HOOKS_DIR/pre-commit" << 'HOOK'
#!/bin/bash
echo "Running Flutter analyze..."
cd "$(git rev-parse --show-toplevel)" || exit 1
flutter analyze --fatal-infos --fatal-warnings
if [ $? -ne 0 ]; then
    echo "Flutter analyze failed. Fix errors before committing."
    exit 1
fi
echo "Running tests..."
flutter test
if [ $? -ne 0 ]; then
    echo "Tests failed. Fix failures before committing."
    exit 1
fi
echo "Formatting code..."
flutter format .
HOOK

# Commit-msg hook
cat > "$HOOKS_DIR/commit-msg" << 'HOOK'
#!/bin/bash
COMMIT_MSG=$(cat "$1")
PATTERN="^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .{1,50}"
if ! [[ $COMMIT_MSG =~ $PATTERN ]]; then
    echo "Invalid commit message format."
    echo "Expected: type(scope): description"
    echo "Types: feat, fix, docs, style, refactor, test, chore"
    exit 1
fi
HOOK

chmod +x "$HOOKS_DIR/pre-commit" "$HOOKS_DIR/commit-msg"

echo "Git hooks installed successfully!"