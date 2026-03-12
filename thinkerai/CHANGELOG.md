# Changelog

## [Latest] - 2026-02-17
### Added
- **Simple Authentication System**: Implemented a file-based user system (`data/users.json`) with login functionality.
- **Database Migration Guide**: Created a comprehensive guide (`简陋登陆和聊天记录保存_到迁徙到正规数据库的流程指南.md`) for future transition to Prisma/PostgreSQL.
- **Improved Chat Persistence**: Added logic to automatically save and retrieve chat history based on the logged-in user and active character.

### Fixed
- **Chat History Loading**: Resolved issues where chat history failed to load due to process environment resolution and naming mismatches.
- **Naming Convention**: Migrated chat files to use `username_characterId.json` (e.g., `xubing@gmail.com_fuxi.json`) for better owner identification.
- **Data Format Compatibility**: Enhanced `getChatHistory` to handle both legacy array formats and new structured object formats.
- **React Key Errors**: Fixed duplicate `id` issues in chat messages that caused UI rendering warnings.
- **Login Breakage**: Restored `findUser` and `getUserById` functions in `db.ts` to fix the broken login API.
- **Guest Mode Experience**: Adjusted language switching logic to be more protective of ongoing guest conversations (though some limitations remain in specific edge cases).

### Robustness & Refactoring
- **Absolute Path Resolution**: Switched to absolute paths for the `data` directory to ensure consistent file access across different Next.js execution contexts.
- **Cleaned Codebase**: Removed temporary debug logs and hardcoded paths from the core logic.
- **AI SDK Integration**: Optimized the streaming response handling to be more resilient.

## [Previous]
- fix(chat): integrate Vercel AI SDK with manual fetch and stream handling and fix undefined append error
- Restored local LM Studio support via localhost (WSL forwarding verified)
- Fix(api): Sanitize chat messages in API route to prevent 'unsupported content types' errors with Groq/OpenAI
- Config: Update .env.local to use localhost for LM Studio and valid Groq model
