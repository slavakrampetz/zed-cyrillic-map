# Zed editor cyrillic keyboard bindings support converter

Zed editor is very promising and powerful editor.

But at linux keyboard shortcuts do not work on non-English keyboard layout:
- https://github.com/zed-industries/zed/issues/10972
- https://github.com/zed-industries/zed/issues/14444

For solve that, there is a solution - register hotkeys for special GTK codes.
But generating such codes manually is very annoying.

## How to use

1. Open [online converter](https://zed-cyrillic.krampetz.ru/)
2. To the left area paste part of you config with hotkeys set for English keyboard layout.
3. Config will be converted: each key need to be converted will have a duplicate record.

If you have an issues with main domain, you can use service at [Netlify subdomain](https://resplendent-meerkat-c49f68.netlify.app/).

## Example

My source config:

```javascript
{
  "context": "Editor",
  "bindings": {
    "backspace": "editor::Backspace",
    "shift-backspace": "editor::Backspace",
    "ctrl-d": "editor::DuplicateLineDown",
    // undo/redo
    "ctrl-z": "editor::Undo",
    "ctrl-shift-z": "editor::Redo",
    // ctrl-s
    "ctrl-s": "workspace::Save",
    // Rename
    "shift-f6": "editor::Rename",
    "f2": "editor::GoToDiagnostic",
    // Comments
    "ctrl-shift-/": "editor::ToggleComments",
    // Move line
    "ctrl-alt-up": "editor::MoveLineUp",
    "ctrl-alt-down": "editor::MoveLineDown",
    // Outline
    "ctrl-2": "outline::Toggle",
    // Large/Smaller
    "ctrl-w": "editor::SelectLargerSyntaxNode",
    "ctrl-shift-w": "editor::SelectSmallerSyntaxNode",
  },
}
```

Result:
```javascript
{
  "context": "Editor",
  "bindings": {
    "backspace": "editor::Backspace",
    "shift-backspace": "editor::Backspace",
    "ctrl-d": "editor::DuplicateLineDown",
    "ctrl-cyrillic_ve": "editor::DuplicateLineDown",
    // undo/redo
    "ctrl-z": "editor::Undo",
    "ctrl-cyrillic_ya": "editor::Undo",
    "ctrl-shift-z": "editor::Redo",
    "ctrl-shift-cyrillic_ya": "editor::Redo",
    // ctrl-s
    "ctrl-s": "workspace::Save",
    "ctrl-cyrillic_yeru": "workspace::Save",
    // Rename
    "shift-f6": "editor::Rename",
    "f2": "editor::GoToDiagnostic",
    // Comments
    "ctrl-shift-/": "editor::ToggleComments",
    // Move line
    "ctrl-alt-up": "editor::MoveLineUp",
    "ctrl-alt-down": "editor::MoveLineDown",
    // Outline
    "ctrl-2": "outline::Toggle",
    // Large/Smaller
    "ctrl-w": "editor::SelectLargerSyntaxNode",
    "ctrl-cyrillic_tse": "editor::SelectLargerSyntaxNode",
    "ctrl-shift-w": "editor::SelectSmallerSyntaxNode",
    "ctrl-shift-cyrillic_tse": "editor::SelectSmallerSyntaxNode",
  },
}
```

### Thanks

Project inspired by [zed-cyrillic](https://github.com/Randommist/zed-cyrillic/tree/main]) repository.
