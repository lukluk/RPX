var page = require('webpage').create();
var system = require('system');
var args = system.args;
page.settings.loadImages = false;
var url = decodeURIComponent(args[1]);
//url = decodeURIComponent('http%3A%2F%2Fsearch.rpxcorp.com%2Flit%2Ftxndce-211022-graftech-international-holdings-v-research-in-motion%23simple2');
var step = 0;
var log = '';
setTimeout(function(){
phantom.exit();
},60000);
if(!url){
phantom.exit();
}
page.open(url, function(status) {
	//Page is loaded!

	page.onLoadFinished = function(status) {

		// Do other things here...
	        
		var title = page.evaluate(function(step, url) {
			var log = {};


				if (step == 0) {
		
				log.log = 'DUCKKKKKK';
				if (document.querySelector('#public_login_btn')) {
					$('<input id="request_path" name="request_path" type="hidden" value="/public_login">').appendTo($('#affixed-table-header form'));
					$('<input id="user_password" name="user[password]" placeholder="Enter your password" required="required" tabindex="2" type="password" value="p123123p">').appendTo('#affixed-table-header form');
					$('<input id="user_email" name="user[email]" placeholder="Enter your email address" required="required" tabindex="1" type="email" value="lukluk@indosystem.com">').appendTo('#affixed-table-header form');
					$('<input class="custom checkbox" id="user_remember_me" name="user[remember_me]" checked="checked" type="checkbox" value="1">').appendTo('#affixed-table-header form');
					document.querySelector('#affixed-table-header form').setAttribute('action', '/users/sign_in');
					document.querySelector('#affixed-table-header form').submit();


					step = 1;
					log.step = step;
					return log;



				}else{
										step = 2;
					log.step = step;
					return log;

				}
			} else
			if (step == 1) {
				
				step = 2;
				log.step = step;

				window.location = url;

				return log;

			} else
			if (step == 2) {

				var o = {};
				o.title = document.querySelector('#mixpanel_object_name_holder').innerText;
				o.data1 = document.querySelectorAll('.subsidiaries li')[0].innerText;
				o.data2 = document.querySelectorAll('.subsidiaries li')[1].innerText.replace('Filed: ','');
				o.data3 = document.querySelectorAll('.subsidiaries li')[2].innerText.replace('Closed: ','');
				o.data4 = document.querySelectorAll('.subsidiaries li')[3].innerText.replace('Latest Docket Entry: ','');
				o.pacer = document.querySelectorAll('.subsidiaries li')[4].querySelectorAll('a')[0].getAttribute('href');
				o.casetype = document.querySelectorAll('.case-details')[0].querySelectorAll('li')[0].querySelectorAll('span')[0].innerText;
				document.querySelectorAll('.case-details')[0].querySelectorAll('li')[1].querySelectorAll('div')[0].innerHTML='';
				o.market = document.querySelectorAll('.case-details')[0].querySelectorAll('li')[1].innerText;
				//o.market = document.querySelectorAll('.case-details')[0].querySelectorAll('li')[1].querySelectorAll('span')[0].innerText;
				o.court = document.querySelectorAll('.case-details')[1].querySelectorAll('li')[0].querySelectorAll('a')[0].innerText;
				var x = document.querySelectorAll('.plaintiff .counsel-party');
				o.LeadAttorney = '';
				for (var n = 0; n < x.length; n++) {
					if (x[n] && x[n].innerText && x[n].innerText.indexOf('Lead') > 0) {
						o.LeadAttorney = o.LeadAttorney + x[n].innerText;
					}
				}

				var x = document.querySelectorAll('.defendants .counsel-party');
				o.defendants = '';
				for (var n = 0; n < x.length; n++) {
					//if(x[n] && x[n].innerText && x[n].innerText.indexOf('Lead')>0){
					o.defendants = o.defendants + x[n].innerText;
					//}
				}
				o.activedefendants = '';
				var x = document.querySelectorAll('.defendants .counsel-party');
				for (var n = 0; n < x.length; n++) {
					if (x[n] && x[n].innerText && x[n].innerText.indexOf('Terminated') < 0) {
						o.activedefendants = o.activedefendants + x[n].innerText;
					}
				}
				o.Tables = {};

				var doc = document.querySelector('.docket_entries_table');
				var table = '';
				var head = doc.querySelectorAll('thead span');
				for (var h in head) {
					if (parseInt(h) > -1) {

						table = table + '"' + head[h].innerText + '"' + ',';
					}
				}
				//table = table + '\n';
                                table=[];
				var body = doc.querySelectorAll('tbody tr');
				for (var h in body) {
					if (parseInt(h) > -1) {
						var row = body[h].querySelectorAll('td');
                                               	var tb=[];
						for (var t in row) {
							if (parseInt(t) > -1)
								tb.push ( row[t].innerText );
						}
                                                 table.push(tb);
						//table = table + '\n';
					}
				}

				o.docket_entries_table = table;

				var ok = document.querySelectorAll('.litigations_table');

				for (var n in ok) {
					if (parseInt(n) > -1) {
						var table = '';
						var head = ok[n].querySelectorAll('thead span');
						for (var h in head) {
							if (parseInt(h) > -1) {

								table = table + '"' + head[h].innerText + '"' + ',';
							}
						}
						//table = table + '\n';
                                                table=[];
						var body = ok[n].querySelectorAll('tbody tr');
						for (var h in body) {
							if (parseInt(h) > -1) {
                                                                var tb=[]
								var row = body[h].querySelectorAll('td');
								for (var t in row) {
									if (parseInt(t) > -1)
										tb.push(row[t].innerText);
								}
								//table = table + '\n';
                                                                table.push(tb);
							}
						}

						o.Tables[parseInt(n) + 1] = table;

					}
				}
				step = 3;
				log.step = step;
				log.output=o;

				return log;

			}


		}, step, url);
		if(title.step==2){
//			page.render('/home/client/deploy/ok.png');
		}else
		if(title.step==3){
			console.log(JSON.stringify(title));
			phantom.exit();
		}
		step = title.step;




	};
});
