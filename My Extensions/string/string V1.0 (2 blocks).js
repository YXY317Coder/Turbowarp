class Block {
  getInfo() {
    return {
      id: 'tools',
      name: '工具',
      color1: "#963696",
      blocks: [
        {
          opcode: 'endl',
          blockType: Scratch.BlockType.REPORTER,
          text: '换行'
        },
        {
          opcode: 'strictlyEquals',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[ONE] 严格等于 [TWO]',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'ABC'
            },
            TWO: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'abc'
            }
          }
        }
      ],
    };
  }
  endl() {
    return '\n';
  }
  strictlyEquals(args) {
    return args.ONE === args.TWO;
  }
}
Scratch.extensions.register(new Block());
