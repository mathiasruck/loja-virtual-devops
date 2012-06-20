/* Utility methods provided by Broadleaf Commerce */
var BLC = (function($) {
	
	var redirectUrlDiv = "blc-redirect-url",
		extraDataDiv   = "blc-extra-data";
	
	function redirectIfNecessary($data) {
		var redirectUrl = $data.find('#' + redirectUrlDiv).text();
		if (redirectUrl != null && redirectUrl !== "") {
			window.location = redirectUrl;
			return true;
		}
		return false;
	}
	
	function getExtraData($data) {
		var extraData = $.parseJSON($data.find('#' + extraDataDiv).text());
		$data.find('#' + extraDataDiv).remove();
		return extraData;
	}
	
	function ajax(options, callback) {
	    var defaults = {
    		success: function(data) {
    			if (!redirectIfNecessary($(data))) {
                    callback(data);
                }
            }
        };
	    
        $.extend(options, defaults); 
        $.ajax(options);
	}
	
	function serializeObject($object) {
	    var o = {};
	    var a = $object.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	}
	
	return {
		redirectIfNecessary : redirectIfNecessary,
		getExtraData : getExtraData,
		ajax : ajax,
		serializeObject : serializeObject
	}
})($);