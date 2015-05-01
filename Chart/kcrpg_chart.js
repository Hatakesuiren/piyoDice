function (user, body){

	function Dice(number){
		//�����`�F�b�N
		if(isNaN(number)) return "\n error : Dice : 'number' demands integer";
		var dice = Math.floor( Math.random() * number ) + 1;
		return dice;
	}
	function adjuster_d66(num){
		//d66��11-66��1~21�ɓ��Ă͂߂�֐�
		//11-16 1-6
		//22-26 7-11
		//33-36 12-15
		//44-46 16-18
		//55,56 19,20
		//66    21
		if (isNaN(num)) return "\n error : adjuster_d66 : 'num' must be number from d66";
		var x=0;
		var y=0;
		x = Math.floor(num/10);
		y = Math.floor(num - x*10);
		if(x >= 1 && x <= 6 && y >= x && y <= 6){
			var return_num = (-x*x+13*x)/2 -6+y;
			return return_num;
		}
		return "\n error : adjuster_d66 : 'num' must be number from d66";
	}
	function random_chart_multi(chart_array, die, num_dice){
		//�����_���`���[�g�p�֐�
		//chart_array:�`���[�g�̒��g�̔z��
		//chart_array[0]:�R�}���h��
		//die:�g�p����T�C�R���̖ʐ�
		//num_dice:�T�C�R���̐�

		//�Ԃ�l: "\n �i�҂�҂�c�j�R�}���h�� : �_�C�X���� �����_���I����e"

		//die,num_dice�����l���ǂ����`�F�b�N�B�ς�������e��
		if(isNaN(die)) die=0;
		if(isNaN(num_dice)) num_dice=0;
		if(die <= 0) return "\n error : random_chart : 'die' must be integer";
		if(num_dice <= 0) return "\n error : random_chart : 'num_dice' must be integer";

		//chart_array���z��ł����āA�\���ȗv�f���������Ă��邩�`�F�b�N
		if ((chart_array instanceof Array) && (chart_array.length >= die * num_dice +1)){
			//���Ȃ�
		}else{
			return "\n error : random_chart : 'chart_array' hasn't enough elements";
		}

		var total = 0;
		var detail = " ";
		var detailtemp = [];
		var return_line = "";
		
		for(cnt = 0; cnt < num_dice; cnt++){
			var thisdie = Dice(die);
			total += thisdie;
			detailtemp.push(thisdie);
		}//for cnt

		if(num_dice!=1) detail= ' (' + detailtemp + ') ';

		return_line = '\n�@(�҂�҂�c)�@' + chart_array[0] + ' : ' + total + detail + chart_array[total];
		return return_line;
	}

	function random_chart(chart_array, die){
		return random_chart_multi(chart_array,die,1);
	}

//�����܂Ŋ֐�

	if(body.match(/^��/)) return;
	if (user == "skype_webchat") {
		bodytemp = body.split(/����̔����F[\n\r]*?/, 2);
		user = bodytemp[0].split(" ")[1];
		body = bodytemp[1];
	}
	var linetemp = "";
	var output = "";


	if(body.match(/^[mM���l][oO�n��][fF�e��][uU�t��]/)&&body.match(/^[mM���l][oO�n��][fF�e��][uU�t��][^\s�@]/)==null){
		//�e�X�g�R�}���h : ����

		//�\�p�̔z���p�ӁB1d6��z��Barray[0]�̓R�}���h���B
		var mofu_array = ["Mofu","���ӁI","���ӂ���","���ӂ����ӂ�","���ӂ��c","���ӂ�","���Ӂczzz"];

		//random_chart(�\�̔z��,�T�C�R���̖ʐ�) �T�C�R���͈�Œ�
		linetemp = random_chart(mofu_array,mofu_array.length-1);
	}

	if(body.match(/^HyperMofuMofu/) &&body.match(/^HyperMofuMofu[^\s�@]/) == null ){
		//�T���v���R�}���h : �͂��ρ[���ӂ���

		//�\�p�̔z���p�ӁBarray[0]�̓R�}���h���B2d6��z�肵�Ă��邽��mofu_array[1]�͋�
		var mofu_array = ["HyperMofuMofu","","����","���ӂ�","���ӂ���","���ӂ��ӂ�","���ӂ��ӂ��H","���ӂ����ӂ���","���ӂ���ӂ��ӁH","���ӂ��ӂ��ӂ��Ӂc","���Ӂ[��I���Ӂ[��I","���ӂ��ӂ��ӂ����ӂ���","���ӂ�c���ӂ�c���ӂ�c"];

		//ramdom_chart_multi(�\�̔z��,�T�C�R���̖ʐ�,�T�C�R���̌�)
		linetemp = random_chart_multi(mofu_array,6,2);
	}

	if (linetemp=="") return;
	output = '�� ' + user + linetemp;
	if (output.match(/function\s\(user\,\sbody/)) return;
	return output;
}