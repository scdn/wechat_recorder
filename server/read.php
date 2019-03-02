<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="http://jplayer.org/latest/dist/jplayer/jquery.jplayer.min.js"></script>
<script type="text/javascript">
//<![CDATA[
$(document).ready(function(){
	var	my_jPlayer = $("#jquery_jplayer"),
		my_trackName = $("#jp_container .track-name"),
		my_playState = $("#jp_container .play-state"),
		my_extraPlayInfo = $("#jp_container .extra-play-info");
	var	opt_play_first = false,
		opt_auto_play = true,
  	opt_text_selected = "Track selected";
	var first_track = true;

	my_jPlayer.jPlayer({
		ready: function () {
			$("#jp_container .track-default").click();
		},
		supplied: "mp3",
		wmode: "window"
	});

	$("#jp_container .track").click(function(e) {
		my_trackName.text($(this).text());
		my_jPlayer.jPlayer("setMedia", {
			mp3: $(this).attr("href")
		});
		if((opt_play_first && first_track) || (opt_auto_play && !first_track)) {
			my_jPlayer.jPlayer("play");
		}
		first_track = false;
		$(this).blur();
		return false;
	});
});
//]]>
</script>
<div id="jquery_jplayer"></div>	<div id="jp_container">
<a href="#" class="track track-default"></a>
<?php
require 'mysql.config.php';
$sql="SELECT openid,phone,url FROM wechat";
$result=$conn->query($sql);
echo "<table border=0>";
while($row=$result->fetch_array(MYSQLI_ASSOC)){
  echo "<tr><td>".$row['url']."</td>";
  echo "<td><a href=\"$row[url]\" class=\"track\">点击播放</a></td></tr>";
}
echo "</table>";
$conn->close();
?>
</div>
