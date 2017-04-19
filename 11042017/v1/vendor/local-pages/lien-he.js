var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geoBegin = null, geoEnd = null;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var npcc = new google.maps.LatLng(10.767576, 106.613278);
  var mapOptions = {
    zoom             : 17,
    center         : npcc,
    //mapTypeId      : google.maps.MapTypeId.HYBRID,
    mapTypeId      : google.maps.MapTypeId.ROADMAP,    
    backgroundColor:'#333'
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);  

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var marker = new google.maps.Marker({
        position: mapOptions.center,
        map: map,
        title: 'Đặc sản Nha Trang quán'
    });
    infoWindow.setContent('<strong>Đặc sản Nha Trang quán</strong><br/>22B Trương Phước Phan, Hồ Chí Minh, Việt Nam'); 
    infoWindow.open(map,marker);
    gmarkers.push(marker);

    //remove all unnecessary styles from Google Maps v3
    setTimeout(function(){$('base').prevAll().remove();}, 1000);
    /**/
}


function calcRoute() {
    var from = geoBegin.formatted_address;
    var to = '22b Trương Phước Phan, Hồ Chí Minh, Việt Nam';
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

  directionsService.route(directionsRequest, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      clearOverlays();
      directionsDisplay.setDirections(response);
      var bounds = new google.maps.LatLngBounds();
        var route = response.routes[0];
        var marker;
        startLocation = new Object();
        endLocation = new Object();
        var legs = response.routes[0].legs;
        for (i=0;i<legs.length;i++) {
            if (i == 0) { 
                startLocation.latlng = legs[i].start_location;
                startLocation.address = legs[i].start_address;
                marker = createMarker(legs[i].start_location,"<strong>Vị trí của bạn</strong>",legs[i].start_address,"marker-user-20x34", 0);
                //bounds.extend(marker.getPosition());
            }
            endLocation.latlng = legs[i].end_location;
            endLocation.address = legs[i].end_address;
        }
        marker = createMarker(endLocation.latlng,"'<strong>Đặc sản Nha Trang quán</strong><br/>22B Trương Phước Phan, Hồ Chí Minh, Việt Nam'",endLocation.address,"marker-restaurant-20x34", 1);
        //bounds.extend(marker.getPosition());
        //map.fitBounds(bounds);
    }
    else {
        console.log("Unable to retrieve your route<br />");
    }
  });
/**/
}

//marker
var infoWindow = new google.maps.InfoWindow();
var infoWindow2 = new google.maps.InfoWindow();
var gmarkers = [];
var icons = new Array();
icons["red"] = new google.maps.MarkerImage("mapIcons/marker_red.png",
      // This marker is 20 pixels wide by 34 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 9,34.
      new google.maps.Point(9, 34));
function getMarkerImage(iconColor) {
   if ((typeof(iconColor)=="undefined") || (iconColor==null)) { 
      iconColor = "red"; 
   }
   if (!icons[iconColor]) {
      icons[iconColor] = new google.maps.MarkerImage("11042017/thumbnail/Maker/"+ iconColor +".png",
      // This marker is 20 pixels wide by 34 pixels tall.
      new google.maps.Size(20, 34),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is at 6,20.
      new google.maps.Point(9, 34));
   } 
   return icons[iconColor];

}
var iconShadow = new google.maps.MarkerImage('http://www.google.com/mapfiles/shadow50.png',
      new google.maps.Size(37, 34),
      new google.maps.Point(0,0),
      new google.maps.Point(9, 34));
var iconShape = {
      coord: [9,0,6,1,4,2,2,4,0,8,0,12,1,14,2,16,5,19,7,23,8,26,9,30,9,34,11,34,11,30,12,26,13,24,14,21,16,18,18,16,20,12,20,8,18,4,16,2,15,1,13,0],
      type: 'poly'
  };
function clearOverlays(){
    for (var i = 0; i < gmarkers.length; i++ ) {
        gmarkers[i].setMap(null);
    }
    gmarkers.length = 0;
}
function createMarker(latlng, label, html, color, iInfo) {
    // var contentString = '<b>'+label+'</b><br>'+html;
    // var marker = new google.maps.Marker({
    //     position: latlng,
    //     map: map,
    //     shadow: iconShadow,
    //     icon: getMarkerImage(color),
    //     shape: iconShape,
    //     title: label,
    //     zIndex: Math.round(latlng.lat()*-100000)<<5
    //     });
    //     marker.myname = label;
        //gmarkers.push(marker);

    // google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.setContent(contentString); 
    //     infowindow.open(map,marker);
    // });

    var marker = new google.maps.Marker({ position: latlng, map: map, });
    gmarkers.push(marker);
    if(iInfo == 0){
        infoWindow.setContent(label); 
        infoWindow.open(map,marker);
    }else if(iInfo == 1){
        infoWindow2.setContent(label); 
        infoWindow2.open(map,marker);
    }
    
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(contentString); 
        infoWindow.open(map,marker);        
    });
    return marker;
}
//end marker

$(document).ready(function(){
    initialize();

    $("#geocomplete").geocomplete({
          //map: ".map_canvas",
          details: "form",
          types: ["geocode", "establishment"],
        }).bind("geocode:result", function(event, result){
            geoBegin = result;
            calcRoute();
          });

        $("#find").click(function(){
            //$("#geocomplete").trigger("geocode");
            calcRoute();
        });
});