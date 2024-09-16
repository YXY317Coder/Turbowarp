class Block {
  getInfo() {
    return {
      id: 'tools',
      name: '工具',
      color1: "#000000",
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
        },
	{
          opcode: 'evaler',
          blockType: Scratch.BlockType.REPORTER,
          text: '计算 [XXX]',
          arguments: {
            XXX: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '1+1'
            }
          }
        },
	{
          opcode: 'edy',
          blockType: Scratch.BlockType.REPORTER,
          text: '反向 [X]',
          arguments: {
            X: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '123'
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
  evaler(args) {
    return eval(args.XXX);
  }
  edy(args) {
    return args.X - 2 * args.X;
  }
}
Scratch.extensions.register(new Block());
