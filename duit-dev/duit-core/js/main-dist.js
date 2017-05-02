"use strict";

/**
 * main.js
 *
 * Concatenates all compiled js files together
 *
 * jQuery 3.2.0+
 *
 * @author    Kelli Rockwell <kellirockwell@mail.com>
 * @copyright 2017 DUiT
 * @since     File available since release 0.0.4  
 */

// @prepros-append begin.js
// @prepros-append app-dist.js
// @prepros-append interact-dist.js
// @prepros-append end.js

// Outer wrapper
(function () {

	"use strict";

	/**
 * app.js
 *
 * Contains Firebase initialization calls and AJAX functions for interacting
 * with the server
 *
 * Notice: this file utilizes conventions from ES6 (ES2015).
 * jQuery 3.2.0+
 *
 * Function will be wrapped in a closure (function call around entire file) at
 * minification process for security purposes. However, as we want different 
 * javascript files to be able to communicate between each other, we are not
 * doing between files. 
 * 
 * TODO: Move DOM listeners to interact.js
 *
 * @author    Patrick Shao <shao.pat@gmail.com>
 * @copyright 2017 DUiT
 * @since     File available since release 0.0.3  
 */

	// Initialize Firebase

	var config = {
		apiKey: "AIzaSyCdqoYOd1r8QE1-UGMOxCEIr7nJQymCXN8",
		authDomain: "duit-ba651.firebaseapp.com",
		databaseURL: "https://duit-ba651.firebaseio.com",
		projectId: "duit-ba651",
		storageBucket: "duit-ba651.appspot.com",
		messagingSenderId: "948811797559"
	};
	firebase.initializeApp(config);

	var txtEmail = document.getElementById('txtEmail');
	var txtPassword = document.getElementById('txtPassword');
	var btnDisplayDus = document.getElementById('btnDisplayDus');
	var btnAddDu = document.getElementById('btnAddDu');
	var btnLogin = document.getElementById('btnLogin');
	var btnSignUp = document.getElementById('btnSignUp');
	var btnLogout = document.getElementById('btnLogout');
	var deleteDuList = document.getElementsByClassName('deleteDu');

	//$('.deleteDu')

	// Add login event
	if (btnLogin) {
		btnLogin.addEventListener('click', function (e) {
			login();
		});
	}

	function login() {
		// Get email and pass
		var email = txtEmail.value;
		var pass = txtPassword.value;
		var auth = firebase.auth();
		// Sign in
		var promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(function (e) {
			return console.log(e.message);
		});
	}

	// Add dus table display event
	if (btnDisplayDus) {
		btnDisplayDus.addEventListener('click', function (e) {
			callServer("displayAsTableDus");
		});
	}

	// Add tags table display event
	if (btnDisplayTags) {
		btnDisplayTags.addEventListener('click', function (e) {
			callServer("displayAsTableTags");
		});
	}

	// Add users table display event
	if (btnDisplayUsers) {
		btnDisplayUsers.addEventListener('click', function (e) {
			callServer("displayAsTableUsers");
		});
	}

	// Delete selected du
	if (deleteDuList) {
		$(document).on('click', '.deleteDu', function (e) {
			deleteDu(e);
		});
	}

	function deleteDu(event) {
		var du_id = $(event.currentTarget).attr('class').slice(12);
		var params = {
			"du_id": du_id
		};
		callServer("deleteDu", params);
	}

	// Add new du
	if (btnAddDu) {
		btnAddDu.addEventListener('click', function (e) {
			addDu();
		});
	}

	function addDu() {
		var du_name = $("#du_name").val();
		var du_time_start = $('#du_time_start').val();
		var du_time_start_time = $('#du_time_start_time').val();
		var du_time_end = $('#du_time_end').val();
		var du_time_end_time = $('#du_time_end_time').val();
		var du_time_deadline = $('#du_time_deadline').val();
		var du_time_deadline_time = $('#du_time_deadline_time').val();

		var du_note = $('#du_note').val();
		var du_status = $('#du_status').val();
		var du_priority = $('#du_priority').val();

		if (du_time_start != "" && du_time_start_time != "") {
			du_time_start += " " + du_time_start_time + ":00";
		}

		if (du_time_end != "" && du_time_end_time != "") {
			du_time_end += " " + du_time_end_time + ":00";
		}

		if (du_time_deadline != "" && du_time_deadline_time != "") {
			du_time_deadline += " " + du_time_deadline_time + ":00";
		}

		var params = {
			"du_name": du_name,
			"du_time_start": du_time_start,
			"du_time_end": du_time_end,
			"du_note": du_note,
			"du_status": du_status
		};

		if (du_time_end != "" && du_time_end != "") {
			params["du_has_duration"] = 1;
		}

		if (du_priority != "none") {
			params["du_enforce_priority"] = 1;
			params["du_priority"] = du_priority;
		}

		if (du_time_deadline != "") {
			params["du_has_deadline"] = 1;
			params["du_time_start"] = du_time_deadline;
		}

		callServer("addDu", params);
	}

	//add new user
	if (btnAddUser) {
		btnAddUser.addEventListener('click', function (e) {
			addUser();
		});
	}

	function addUser() {
		var user_name = $('#user_name').val();

		var params = {
			"user_name": user_name
		};
		callServer("addUser", params);
	}

	//add new tag
	if (btnAddTag) {
		btnAddTag.addEventListener('click', function (e) {
			addTag();
		});
	}

	function addTag() {
		var tag_name = $('#tag_name').val();
		var tag_note = $('#tag_note').val();

		var params = {
			"tag_name": tag_name,
			"tag_note": tag_note
		};

		console.log("params");
		console.log(params);

		callServer("addTag", params);
	}

	// Add signup event
	if (btnSignUp) {
		btnSignUp.addEventListener('click', function (e) {
			signUp();
		});
	}

	function signUp() {
		// Get email and pass
		var email = txtEmail.value;
		var pass = txtPassword.value;
		var auth = firebase.auth();

		// Sign in
		var promise = auth.createUserWithEmailAndPassword(email, pass).then(function () {
			//create a user
			addUser();
		}, function (reason) {
			console.log(reason);
		});
	}

	// Add signout
	if (btnLogout) {
		btnLogout.addEventListener('click', function (e) {
			sighOut();
		});
	}

	function signOut() {
		firebase.auth().signOut();
	}

	// Add a real time listener for changes in user state
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log(user);
			if (btnLogout) {
				btnLogout.classList.remove('hide');
			}
		} else {
			console.log('not logged in');
			if (btnLogout) {
				btnLogout.classList.add('hide');
			}
		}
	});

	function updatePayload(input, payload, params) {
		if (input in params && params[input] !== "") {
			payload += "&" + input + "=" + params[input];
		}
		return payload;
	}

	function callServer(function_name) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var callback = arguments[2];

		firebase.auth().currentUser.getToken( /* forceRefresh */true).then(function (idToken) {
			// Send token to your backend via HTTPS
			console.log(function_name);

			var paramKeys = ["du_id", "du_name", "du_has_date", "du_has_deadline", "du_has_duration", "du_time_start", "du_time_end", "du_priority", "du_enforce_priority", "du_note", "du_status", "user_name", "tag_name", "tag_note"];

			var payload = "idToken=" + idToken + "&user_id=" + firebase.auth().currentUser.uid + "&function_name=" + function_name;

			for (var i = 0; i < paramKeys.length; i++) {
				var paramKey = paramKeys[i];
				payload = updatePayload(paramKey, payload, params);
			}

			console.log(payload);

			$.ajax({
				cache: false,
				type: "GET",
				url: "auth.php",
				data: payload,
				success: function success(msg) {
					$(".responseContainer").html(msg);
				},
				error: function error(e) {
					console.log(e);
				}
			});
		}).catch(function (error) {
			// Handle error
			console.log(error);
		});
	}

	$(document).ready(function () {
		console.log("ready!");
	});
	'use strict';

	/**
  * interact.js
  *
  * Contains functions for handling primary user interaction and dynamic
  * visual changes within the app
  *
  * Notice: this file utilizes conventions from ES6 (ES2015).
  * jQuery 3.2.0+
  *
  * @author    Kelli Rockwell <kellirockwell@mail.com>
  * @copyright 2017 DUiT
  * @since     File available since release 0.0.4  
  */

	$(document).ready(function () {

		// Remember if settings menu is off screen/where off screen is
		var $settingsIsOpen = false;
		var $offScreen = 0;

		// Remember if module window is open
		var $moduleIsOpen = false;

		// Window level (z-index)
		var $windowLevel = 5;

		// Initial calls on page load
		// Move settings menu out of sight off screen
		moveSettingsOffscreen();

		// On window resize
		$(window).bind('resize', function (e) {
			// If settings menu is not open
			if (!$settingsIsOpen) {
				// Wait long enough for settings menu to resize (css transition 0.2s)
				setTimeout(function () {
					// Move it off screen
					moveSettingsOffscreen();
				}, 200);
			}
		});

		// Simple function to move settings menu off left side of screen + 150px 
		function moveSettingsOffscreen() {
			$offScreen = -$('#settings').outerWidth() - 150;
			$('#settings').css('left', $offScreen);
		}

		// Move .overlay.darken to foreground, behind window level
		function toggleOverlay(tog, obj) {
			var $z = tog ? $windowLevel - 1 : -$windowLevel;
			var $o = tog ? 1 : 0;
			var $anTime = 600;
			// Animate opacity change
			$(obj).animate({ opacity: $o }, $anTime);
			if (tog) {
				// If turning overlay on, immediately bring it to front first
				$(obj).css('z-index', $z);
			} else {
				// If turning overlay off, only push it to back after opacity change
				setTimeout(function () {
					$(obj).css('z-index', $z);
				}, $anTime);
			}
		}

		// Handle showing/hiding sliding settings menu
		$(document).on('click', 'body', function (e) {
			// Delay to ensure $settingsIsOpen changes before if checks
			setTimeout(function () {
				if ($settingsIsOpen && !$(e.target).is('#settings, #settings *')) {
					// If settings menu is open and user does not click within the
					// settings menu area, close settings menu
					closeSettings();
					// Hide darkened overlay
					toggleOverlay(0, '.overlay.darken');
				} else if (!$settingsIsOpen && $(e.target).is('#settings-btn, #settings-btn *')) {
					// If settings menu is not open and user clicks on the settings
					// button, open settings menu
					openSettings();
					// Show darkened overlay
					toggleOverlay(1, '.overlay.darken');
				}
			}, 10);
		});

		// Close settings menu
		function closeSettings() {
			$settingsIsOpen = false;
			// Slide settings back to off screen position
			$('#settings').animate({ left: $offScreen }, 700);
		}

		// Open settings menu
		function openSettings() {
			$settingsIsOpen = true;
			// Slide settings onto screen from left
			$('#settings').animate({ left: 0 }, 700);
		}

		// Handle showing/hiding 
		$(document).on('click', 'body', function (e) {
			// Delay to ensure $moduleIsOpen changes before if checks
			setTimeout(function () {
				if ($moduleIsOpen && !$(e.target).is('.module-window, .module-window *')) {
					// If current module is open and user does not click within the
					// module window area, close module window
					closeModule();
				} else if (!$moduleIsOpen && $(e.target).is('.module-btn, .module-btn *')) {
					// If current module is not open and user clicks on the module's
					// button, open that module
					var $moduleName = $(e.target).closest('.module-btn').attr('id');
					openModule($moduleName);
				}
			}, 10);
		});

		// Close module window
		function closeModule() {
			var $form = $('.module-window form');
			$moduleIsOpen = false;
			// Hide darkened overlay and window
			toggleOverlay(0, '.overlay.darken');
			toggleOverlay(0, '.overlay.module');
			// Turn window content down to full transparency
			$form.animate({ opacity: 0 }, 700, function () {
				// After opacity change animation is complete, remove window content
				$form.html('closed');
			});
		}

		// Open module window of specified type
		function openModule(module) {
			var $form = $('.module-window form');
			$moduleIsOpen = true;
			// Make sure settings is closed
			closeSettings();
			// Show darkened overlay and window
			toggleOverlay(1, '.overlay.darken');
			toggleOverlay(1, '.overlay.module');
			// Change content of window to reflect type
			$form.html(module);
			// Bring window content up to full opacity
			$form.animate({ opacity: 1 }, 700);
		}

		// Button for hiding du table display generated by AJAX
		if ($('#btnHideDisplay')) {
			$(document).on('click', '#btnHideDisplay', function (e) {
				$('.responseContainer').html('');
			});
		}
	});
})();