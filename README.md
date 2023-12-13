# aidocgen

A powerful CLI tool for generating comprehensive markdown documentation for projects, using OpenAI's GPT.

## Installation

Install `aidocgen` using npm:

```bash
  npm install -g aidocgen
```

Install `aidocgen` using yarn:

```bash
  yarn global add aidocgen
```

## Features

- Generates detailed documentation for all code files and projects.
- Uses OpenAI's GPT-3 for intelligent and context-aware documentation.
- Easy to set up and use with a simple CLI interface.

## Usage

Before using aidocgen, you need to set your OpenAI API key. Run the initialization command and follow the prompts:

```bash
  aidocgen init
```

You will be asked to provide your OpenAI API key which will be set locally for your future use. We do not have access to your OpenAI API key.

### Generate documentation for a single file:

```bash
  aidocgen parse path/to/yourFile.ts
```

### Generate documentation for an entire directory:

```bash
  aidocgen parse path/to/yourDirectory
```

## Contributing

Contributions are welcome! If you have an idea for improvement or have found a bug, please open an issue or submit a pull request.

[https://github.com/shammahk/aidocgen](https://github.com/shammahk/aidocgen)

## License

`aidocgen` is [MIT licensed](https://github.com/shammahk/aidocgen/blob/main/LICENSE).
