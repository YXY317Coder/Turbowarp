(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This Hello World example must run unsandboxed');
  }
const vm = Scratch.vm;
function apt(tin, wm) {
    return '&' + tin + '=' + wm;
}

function apd(prod1, prod2, act) {
    var yon = 'https://tinywebdb.appinventor.space/api?user=' + prod1 + '&secret=' + prod2 + '&action=' + act;
    return yon;
}

async function pt(prod1, prod2, o, ...args) {
    var url = '';
    if (o === 'count') {
        url = apd(prod1, prod2, o);
    } else if (o === 'get') {
        url = apd(prod1, prod2, o) + apt('tag', args[0]);
    } else if (o === 'delete') {
        url = apd(prod1, prod2, o) + apt('tag', args[0]);
    } else if (o === 'update') {
        url = apd(prod1, prod2, o) + apt('tag', args[0]) + apt('value', args[1]);
    } else if (o === 'search') {
        url = apd(prod1, prod2, o) + apt('no', args[0]) + apt('count', args[1]) + apt('tag', args[2]) + apt('type', args[3]);
    }

    try {
        let response = await Scratch.fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        let data = await response.text();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return null;
    }
}

function isJSONString(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

rt1 = '';
rt2 = '';

class TinyWebDB {
    getInfo() {
        return {
            color1: '#000000',
            docsURI: "No Docs Now,Don't USE Me",
            id: 'tinywebdb',
            name: 'TinyWebDB',
            blocks: [
                {
          opcode: 'Setting1',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set my TinyWebDB account name to [NAME], secret [PAS]',
		  arguments: {
            NAME: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: 'share'
            },
            PAS: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'everyone'
            }
          }
        },
		{
          opcode: 'TestSet',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Can connect to TinyWebDB?'
        },
		{
          opcode: 'COUNTER',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Number of items'
        },
		{
          opcode: 'GETER',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get an item named [TAG]',
		  arguments: {
            TAG: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: 'abc'
            }
          }
        },
		{
          opcode: 'UPDATER',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set [A] to [B]',
		  arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: 'abc'
            },
			B: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: '123'
            }
          }
        },
		{
          opcode: 'DELETER',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Delete an item named [TAGG]',
		  arguments: {
            TAGG: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: 'abc'
            }
          }
        },
		{
          opcode: 'SEARCHER',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Search, start item num: [SIN], number of searches [NOS], characters contained in the tags(item name) [CIT2], type(tag/value/both): [T1]',
		  arguments: {
            SIN: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: '1'
            },
			NOS: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: '1'
            },
			CIT2: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: ''
            },
			T1: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: 'both'
            }
          }
        },
		{
		  opcode: 'JSONHELPER',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get JSON value, JSON: [JSONG], tag_name: [NAMEE]',
		  arguments: {
            JSONG: {
              type: Scratch.ArgumentType.STRING,
			  defaultValue: '{"abc":"123"}'
            },
			NAMEE: {
			  type: Scratch.ArgumentType.STRING,
			  defaultValue: 'abc'
			}
          }
		}
            ]
        };
    }

    Setting1(args) {
        rt1 = args.NAME;
        rt2 = args.PAS;
    }

    TestSet() {
        return pt(rt1, rt2, 'count').then(data => isJSONString(data));
    }

    COUNTER() {
        return pt(rt1, rt2, 'count').then(data => {
            if (isJSONString(data)) {
                let parsedData = JSON.parse(data);
                return parsedData['count'];
            } else {
                return 'account error!';
            }
        });
    }

    GETER(args) {
        return pt(rt1, rt2, 'get', args.TAG).then(data => {
            if (isJSONString(data)) {
                let parsedData = JSON.parse(data);
                return parsedData[args.TAG];
            } else {
                return 'account error!';
            }
        });
    }

    UPDATER(args) {
        return pt(rt1, rt2, 'update', args.A, args.B).then(() => {
            // fetch 不返回任何内容表示成功执行，因此这里不需要返回值
        }).catch(() => {
            return 'account error!';
        });
    }

    DELETER(args) {
        return pt(rt1, rt2, 'delete', args.TAGG).then(() => {
            // fetch 不返回任何内容表示成功执行，因此这里不需要返回值
        }).catch(() => {
            // 虽然 fetch API 风格上通常不捕获并处理具体错误，但为了与原有逻辑一致，这里模拟原有行为
            // 实际上，根据具体需求，可能需要对错误进行更细致的处理
        });
    }

    SEARCHER(args) {
        return pt(rt1, rt2, 'search', args.SIN, args.NOS, args.CIT2, args.T1).then(data => {
            return data;
        }).catch(() => {
            return 'account error!';
        });
    }

    JSONHELPER(args) {
        var xxx = JSON.parse(args.JSONG);
        return xxx[args.NAMEE];
    }
}
Scratch.extensions.register(new TinyWebDB());
})(Scratch);
