function (user , body){

	function Dice(number){
		var dice = Math.floor( Math.random() * number ) + 1;
		return dice;
	}

	function random_chart(chart_array,die){
		//�����_���`���[�g�p�֐�
		//chart_array:�`���[�g�̒��g�̔z��
		//chart_array[0]:�R�}���h��
		//die:�g�p����T�C�R���̖ʐ�

		//�Ԃ�l: "\n �i�҂�҂�c�j�R�}���h�� : �_�C�X���� �����_���I����e"

		//chart_array���z��ł����āA�\���ȗv�f���������Ă��邩�`�F�b�N
		if ((chart_array instanceof Array) && (chart_array.length >= die+1)){
			//���Ȃ�
		}else{
			return "�z��~�X�H";
			//���ǂ��G���[�����ق����B
		}

		var random_die = Dice(die);

		var return_line = "";
		return_line = '\n�@(�҂�҂�c�j' + chart_array[0] + ' : ' + random_die + ' ' + chart_array[random_die];
		return return_line;
	}

	if(body.match(/^��/)) return;
	if (user == "skype_webchat") {
		bodytemp = body.split(/����̔����F[\n\r]*?/, 2);
		user = bodytemp[0].split(" ")[1];
		body = bodytemp[1];
	}
	var linetemp = "";
	var output = "";


	if(body.match(/^[mM���l][oO�n��][fF�e��][uU�t��]/)&&body.match(/^[mM���l][oO�n��][fF�e��][uU�t��][^\s�@]/)==null){
		//�e�X�g�R�}���h:����
		var mofu_array = ["Mohu","���ӁI","���ӂ���","���ӂ����ӂ�","���ӂ��c","���ӂ�","���Ӂczzz"];
		linetemp = random_chart(mofu_array,mofu_array.length-1);
	}
	if (linetemp=="") return;
	output = '�� ' + user + linetemp;
	if (output.match(/function\s\(user\,\sbody/)) return;
	return output;
}