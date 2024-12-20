function apt(tin,wm){
    return '&' + tin + '=' + wm;
}
function apd(prod1,prod2,act){
	var yon = 'https://tinywebdb.appinventor.space/api?user=' + prod1 + '&secret=' + prod2 + '&action=' + act;
	return yon;
}
function pt(prod1,prod2,o,...args){
	var xhr = new XMLHttpRequest();
    var url = '';
	if (o === 'count'){
		url = apd(prod1,prod2,o);
	}
	else if (o === 'get'){
		url = apd(prod1,prod2,o) + apt('tag',args[0]);
	}
	else if (o === 'delete'){
		url = apd(prod1,prod2,o) + apt('tag',args[0]);
	}
	else if (o === 'update'){
		url = apd(prod1,prod2,o) + apt('tag',args[0]) + apt('value',args[1]);
	}
	else if (o === 'search'){
		url = apd(prod1,prod2,o) + apt('no',args[0]) + apt('count',args[1]) + apt('tag',args[2]) + apt('type',args[3]);
	}
	xhr.open("GET", url, false); 
	xhr.send();
	if (xhr.status === 200) {
	    return(xhr.responseText);
	} else {
	    return(xhr.statusText);
	}
};
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
  TestSet(){
	  var dtest = pt(rt1,rt2,'count');
	  return isJSONString(dtest);
  }
  COUNTER(){
	  if (isJSONString(pt(rt1,rt2,'count'))){
		  var dtest = JSON.parse(pt(rt1,rt2,'count'));
		  return dtest['count'];
	  }
	  else{
		  return 'account error!';
	  }
  }
  GETER(args){
	  if (isJSONString(pt(rt1,rt2,'count'))){
		  var dtest = JSON.parse(pt(rt1,rt2,'get',args.TAG));
		  return dtest[args.TAG];
	  }
	  else{
		  return 'account error!';
	  }
  }
  UPDATER(args){
	  if (isJSONString(pt(rt1,rt2,'count'))){
		  pt(rt1,rt2,'update',args.A,args.B);
	  }
	  else{
		  return 'account error!';
	  }
  }
  DELETER(args){
	  if (isJSONString(pt(rt1,rt2,'count'))){
		  pt(rt1,rt2,'delete',args.TAGG);
	  }
  }
  SEARCHER(args){
	  if (isJSONString(pt(rt1,rt2,'count'))){
		  return pt(rt1,rt2,'search',args.SIN,args.NOS,args.CIT2,args.T1);
	  }
	  else{
		  return 'account error!';
	  }
  }
  JSONHELPER(args){
	  var xxx = JSON.parse(args.JSONG);
	  return xxx[args.NAMEE];
  }
}

Scratch.extensions.register(new TinyWebDB());
