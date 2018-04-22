const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require('ytdl-core');

const DM = require('discord-yt-player')

//const ytapi = require('./YoutubeAPI.js'); // Change YoutubeAPI to your own file name if you used a different name in step two
const YouTube = require("discord-youtube-api");
var await = require('asyncawait/await');
const youtube = new YouTube("AIzaSyA-DOfmLGp4BTKLvFU2kMb1LL9ABQSgXLQ");

var dateTime = require('node-datetime');
var schedule = require('node-schedule');

var nowplaying = {};
var volume = {};
var servers = {};

client.on("ready", () => {
	console.log("I am ready!");

	// Get the channel via ID
	let channel = client.channels.get('376410531336159246');
	let tchannel = client.channels.get('376414044447571981');
	// Or via name (less persistent)
	//channel = client.channels.find('name', 'Music');

	yt_api_key: 'AIzaSyA-DOfmLGp4BTKLvFU2kMb1LL9ABQSgXLQ' // Youtube Api Key
	
	channel.join()
	.then(connection => console.log('Connected'))

	//channel.join()
	//.then(connection => {})
	//.then(dispatcher => {
	//	dispatcher.on('error', console.error);
	//	// You can also do things like dispatcher.pause() and dispatcher.end() here.
	//})
	//.catch(console.error);

	//var rule = new schedule.RecurrenceRule();
	//rule.minute = 0;
	//rule.hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
	//var everyhrjob = schedule.scheduleJob(rule, function () {
		//	var dt = dateTime.create();
		//	var formatteddt = dt.format('Y-m-d H:M:S');
		//	console.log(formatteddt);
		//	tchannel.sendMessage('現在時間：' + formatteddt);
		//})
});

// Set the prefix
const prefix = "|"
	client.on("message", (message) => {

		// Exit and stop if it's not there
		if (!message.content.startsWith(prefix))
			return;

		// our new check:
		if (!message.content.startsWith(prefix) || message.author.bot)
			return;
		// [rest of the code]


		// Monika Reply.
		if (message.content.startsWith(prefix + "hi")) {
			var rantmp;
			rantmp = Math.floor(Math.random() * 5) + 1;
			switch (rantmp) {
			case 1:
				playaudio('F:/Creative Things/Voices/Jane/簡之笑.mp3');
				message.channel.send("Hello!" + message.author + "!");
				break;
			case 2:
				playaudio('F:/Creative Things/Voices/Jane/簡之笑.mp3');
				message.channel.send("It's Good to see you Today!!");
				break;
			case 3:
				playaudio('F:/Creative Things/Voices/Jane/簡之笑.mp3');
				message.channel.send("Are you willing to join the club?");
				break;
			case 4:
				playaudio('F:/Creative Things/Voices/Jane/簡之笑.mp3');
				message.channel.send("..!♪♪♪", {
					file: "F:/Creative Things/Pictures/15128467781534.png" // Or replace with FileOptions object
				});
				break;
			case 5:
				playaudio('F:/Creative Things/Voices/Jane/簡之笑.mp3');
				break;
			}

		}

		// Monika PlayAudioFile.
		if (message.content.startsWith(prefix + "fileplay") || message.author.id == '376705365540339734') {
			if (!message.content.startsWith(prefix))
				return;
			var args = message.content.substring(prefix.length).split(" ");

			var filedic;

			filedic = message.content.substring(prefix.length + args[0].length + 1);

			playaudio(filedic);
		}

		// Monika SendMsg.
		if (message.content.startsWith(prefix + "sendmsg") || message.author.id == '376705365540339734') {
			if (!message.content.startsWith(prefix))
				return;
			var args = message.content.substring(prefix.length).split(" ");
			var msgtosend;
			let tchannel = client.channels.get('376414044447571981');
			tchannel.sendMessage(args[1]);
		}

		// Monika Now Time.

		if (message.content.startsWith(prefix + "nowtime")) {
			var dt = dateTime.create();
			var formatteddt = dt.format('Y-m-d H:M:S');
			console.log(formatteddt);
			message.channel.send('現在時間：' + formatteddt);

		}

		// ForeSkin
		if (message.content.startsWith(prefix + "包皮") || message.content.startsWith(prefix + "foreskin") || message.content.startsWith(prefix + "FORESKIN") || message.content.startsWith(prefix + "割") || message.content.startsWith(prefix + "皮")) {
			var rantamp;
			rantamp = Math.floor(Math.random() * 8) + 1;
			switch (rantamp) {
			case 1:
				message.channel.send("幹你娘");
				break;
			case 2:
				message.channel.send("耖你媽");
				break;
			case 3:
				message.channel.send("淦信不信我明天去早餐店堵你");
				break;
			case 4:
				message.channel.send("你明天給我小心點");
				break;
			case 5:
				message.channel.send("殺小");
				break;
			case 6:
				message.channel.send("淦我明天直接去你家門");
				break;
			case 7:
				playaudio('F:/Creative Things/Voices/Jane/ThisReallyNeedIt.wav');
				break;
			case 8:
				playaudio('F:/Creative Things/Voices/Jane/屁股過來大聲版.wav');
				break;
			}
		}
		// The Classic Cya
		if (message.content.startsWith(prefix + "Cya")) {
			message.delete(1000); // This Will Delete the Last Msg , The command msg.
			message.channel.send("Cya!");
			message.guild.voiceConnection.disconnect();
		}
	});


	function playaudio(dic)
{
	//const dispatcher = connection.playFile(dic);
}

	
//Play Music Func
function play(connection, message) {
    var server = servers[message.guild.id];

    nowplaying[message.guild.id] = server.queue.shift();
    var video = nowplaying[message.guild.id];

    var iconurl = client.user.avatarURL;
    var embed = new Discord.RichEmbed()
        .setAuthor("Music", iconurl)
        .setColor([0, 255, 0])
        .setDescription("**現在播放:**\n" +
        video.title)
        .setThumbnail(video.thumbnail)
    message.channel.send(embed); // This sends a message of the current music playing

    server.dispatcher = connection.playStream(YTDL(video.url, { filter: "audioonly" })); // This will stream only the audio part of the video.
    if (volume[message.guild.id]) // This checks if the user have set a volume
        server.dispatcher.setVolume(volume[message.guild.id]); // This sets the volume of the stream

    server.dispatcher.on("end", function () {
        nowplaying[message.guild.id] = null;
        if (server.queue.length > 0)
            play(connection, message);
        else {
          //  connection.disconnect();
          //  server.dispatcher = null;
        }
    });
}
//Get Video Func
  async function getVideo(vidstr) 
	{
        
			
			var videot = await youtube.searchVideos(vidstr);
			
                    var video = 
					{
                        title: videot.title,
                        url: videot.url,
                        thumbnail: videot.thumbnails,
                        description: videot.description,
                        publishedDate: videot.publishedDate
                    };
                    return (video);
    }
	
	
// The Music Commands.	
client.on("message", function (message) {
	if (message.author.equals(client.user))
		return;

	if (!message.content.startsWith(prefix))
		return;

	var args = message.content.substring(prefix.length).split(" ");

	switch (args[0].toLocaleLowerCase()) {
	case "play":
		var iconurl = client.user.avatarURL;

		if (!args[1]) {
			var embed = new Discord.RichEmbed()
				.setAuthor("Music", iconurl)
				.setColor([255, 0, 0])
				.setDescription(`**用法:** ${prefix}play <連結/搜尋>`)
				message.channel.send(embed);
			return;
		}
		if (!message.member.voiceChannel) {
			message.channel.send("你必須在一個語音頻道裡才能放音樂!");
			return;
		}
		if (!servers[message.guild.id])
			servers[message.guild.id] = {
				queue: []
			};

		var server = servers[message.guild.id];
		var search;

		if (args[1].toLowerCase().startsWith('http')) {
			search = args[1];
		} else {
			search = message.content.substring(prefix.length + args[0].length + 1);
		}
		getVideo(search).then(function (video) {

			server.queue.push(video);

			if (server.dispatcher) {
				if (server.queue.length > 0) {
					var embed = new Discord.RichEmbed()
						.setAuthor("Music", iconurl)
						.setColor([0, 255, 0])
						.setDescription("**已加入播放:**\n" +
							video.title)
						.setThumbnail(video.thumbnail)
						message.channel.send(embed);
				}
			}
			
            play(connection, message);
			if (!message.guild.voiceConnection) {
				message.member.voiceChannel.join().then(function (connection) {
					if (!server.dispatcher) {
						play(connection, message);

					} else {
						if (!server.dispatcher)
							play(message.guild.voiceConnection, message);
					}
				})
			}
		});
		break;
	case "skip":
		var server = servers[message.guild.id];
		if (server.dispatcher) {
			server.dispatcher.end();
		}
		break;
	case "stop":
		var server = servers[message.guild.id];
		if (message.guild.voiceConnection) {
			message.guild.voiceConnection.disconnect();
			server.queue.splice(0, server.queue.length);
		}
		break;
	case "playing":
		var iconurl = client.user.avatarURL;
		if (nowplaying[message.guild.id]) {
			var video = nowplaying[message.guild.id];
			var embed = new Discord.RichEmbed()
				.setAuthor("Music", iconurl)
				.setColor([0, 255, 0])
				.setDescription("**現在播放:**\n" +
					video.title)
				.setThumbnail(video.thumbnail)
				message.channel.send(embed);
		} else {
			var embed = new Discord.RichEmbed()
				.setAuthor("Music", iconurl)
				.setColor([0, 255, 0])
				.setDescription("現在沒有放音樂")
				message.channel.send(embed);
		}
		break;
	case "list":
		var iconurl = client.user.avatarURL;
		if (nowplaying[message.guild.id]) {
			var video = nowplaying[message.guild.id];
			var server = servers[message.guild.id];
			var desc = `**現在播放:**\n${video.title}\n\n`;
			for (var i = 0; i < server.queue.length; i++) {
				if (i == 0) {
					desc = desc + "**Queue:**\n";
					desc = desc + `**${i + 1}.** ${server.queue[i].title}\n`;
				} else {
					desc = desc + `**${i + 1}.** ${server.queue[i].title}\n`;
				}
			}
			var embed = new Discord.RichEmbed()
				.setAuthor("Music", iconurl)
				.setColor([0, 255, 0])
				.setDescription(desc)
				message.channel.send(embed);
		} else {
			var embed = new Discord.RichEmbed()
				.setAuthor("Music", iconurl)
				.setColor([0, 255, 0])
				.setDescription("現在沒有放音樂")
				message.channel.send(embed);
		}
		break;
	case "vol":
		var iconurl = client.user.avatarURL;
		if (!args[1]) {
			var embed = new Discord.RichEmbed()
				.setAuthor("Music", iconurl)
				.setColor([255, 0, 0])
				.setDescription(`**用法:** ${prefix}volume <音量>`)
				message.channel.send(embed);
			return;
		}

		if (args[1] < 0 || args[1] > 100) {
			message.channel.send("這殺小?輸入0到100好嗎?");
			return;
		}

		volume[message.guild.id] = Number(args[1]) / 100;
		var server = servers[message.guild.id];
		if (server.dispatcher) {
			server.dispatcher.setVolume(volume[message.guild.id]);
			message.channel.send(`音量設定: ${args[1]}%`);
		}
		break;
	default:
		break;
	}
});

client.login("Mzk5MTMwMzU4MjMyMzgzNDk4.DVX7XQ.zMe_0Vc7XO4CIqe1fUd-hCZqN6M");
