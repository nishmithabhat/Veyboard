'''
Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel

This is the main.py file where the backend of the'Virtual Keyboard with Language Translation and Speech-To-Text' project is written.

Completed On: 22nd May, 2021
'''

#importing the necessary libraries
from flask import Flask, request, render_template
from google_trans_new import google_translator
import speech_recognition as sr
import cv2
import numpy as np
import pyautogui
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#object of Translator
translator = google_translator()
r = sr.Recognizer()

cursor = [960,540]

def nothing(x):
	''' 
		nothing function doesn't do anything. It is useful at the time of creating trackbars.
	'''
	pass


def swap( array, i, j):
	'''
		This function is used to bring to the top the contours with largest area in the specified range.

		Args:
			 array -> contours
			 i 	   -> position of contour array
			 j	   -> position of contour array

		Returns:
			
	'''
		
	temp = array[i]
	array[i] = array[j]
	array[j] = temp


def distance( c1, c2):
	'''
		This function is used to find the distance between two centroids using the Distance formula.

		Args:
			 c1 -> coordinate
			 c2 -> coordinate

		Returns:
			 distance
	'''
	distance = pow( pow(c1[0]-c2[0],2) + pow(c1[1]-c2[1],2) , 0.5)
	return distance


def changeStatus(key):
	'''
		This function is used to toggle the status of control variables.
		The control variables are as follows:
		P => Mouse simulation
		C => Centroid
		R => Recalibration(segmentation)

		Args:
			 key -> the input givem by the keyboard

		Returns:
	'''
	global perform
	global showCentroid
	global yellow_range,red_range,blue_range
	# toggle mouse simulation
	if key == ord('p'):
		perform = not perform
		if perform:
			print('Mouse simulation ON...')
		else:
			print('Mouse simulation OFF...')
	
	# toggle display of centroids
	elif key == ord('c'):
		showCentroid = not showCentroid
		if showCentroid:
			print('Showing Centroids...')
		else:
			print('Not Showing Centroids...')

	elif key == ord('r'):
		print('**********************************************************************')
		print('	You have entered recalibration mode.')
		print(' Use the trackbars to calibrate and press SPACE when done.')
		print('	Press D to use the default settings')
		print('**********************************************************************')

		yellow_range = calibrateColor('Yellow', yellow_range)
		red_range = calibrateColor('Red', red_range)
		blue_range = calibrateColor('Blue', blue_range)			
	
	else:
		pass



def makeMask(hsv_frame, color_Range):
	''' 
		The cv2.inRange function is used to filter out a particular color from the frame.
		The result then undergoes Gaussian blurring.

		Args:
			 hsv_frame   -> the frame which is converted from RGB to HSV
			 color_Range -> the color range which could either be yellow, red or blue.

		Returns:
			 blur which is the resultant frame is returned as mask 
	'''
	mask = cv2.inRange( hsv_frame, color_Range[0], color_Range[1])
	# Morphosis next ...
	# blur=cv2.GaussianBlur(mask,(7,7),0)
	eroded = cv2.erode( mask, kernel, iterations=1)
	dilated = cv2.dilate( eroded, kernel, iterations=1)
	
	return dilated



def drawCentroid(vid, color_area, mask, showCentroid):
	'''
		This function is used to draw centroid of the colored objects.
		The contours on the mask are detected. Only those contours are detected which lies in the previously set area. 
		The ranges are filtered out and the centroid of the largest of these is drawn.

		Args:
			 vid          -> the frame captured by the webcam
			 color_area	  -> the area of the color whose centroid you want to draw
			 mask         -> the masked image of the color which has been passed to this function.
			 showCentroid -> boolean flag used to track the centroid

		Returns:
			 center which is the largest centroid found.
	'''
	contour,_ = cv2.findContours( mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

	l=len(contour)
	area = np.zeros(l)

	# filtering contours on the basis of area range specified globally 
	for i in range(l):
		if cv2.contourArea(contour[i])>color_area[0] and cv2.contourArea(contour[i])<color_area[1]:
			area[i] = cv2.contourArea(contour[i])
		else:
			area[i] = 0
	
	a = sorted( area, reverse=True)	

	# bringing contours with largest valid area to the top
	for i in range(l):
		for j in range(1):
			if area[i] == a[j]:
				swap( contour, i, j)

	if l > 0 :		
		# finding centroid using method of 'moments'
		M = cv2.moments(contour[0])
		if M['m00'] != 0:
			cx = int(M['m10']/M['m00'])
			cy = int(M['m01']/M['m00'])
			center = (cx,cy)
			if showCentroid:
				cv2.circle( vid, center, 5, (0,0,255), -1)
					
			return center
	else:
		# return error handling values
		return (-1,-1)



def calibrateColor(color, def_range):
	''' 
		This function helps in filtering the required colored objects from the background using trackbars, masking and blurring

		Args:
			 color 	   -> The name of the color you wish to calibrate
			 def_range -> The color range defined for that particular color.

		Returns:
			 If user presses space then the window is destroyed.
			 Else if user presses 'd' then the def_range of that color is returned i.e. it returns the default range values for that color.

	'''
	
	name = 'Calibrate '+ color
	cv2.namedWindow(name)
	cv2.createTrackbar('Hue', name, def_range[0][0]+20, 180, nothing)
	cv2.createTrackbar('Sat', name, def_range[0][1]   , 255, nothing)
	cv2.createTrackbar('Val', name, def_range[0][2]   , 255, nothing)
	while(1):
		ret , frameinv = cap.read()
		frame=cv2.flip(frameinv ,1)

		hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

		hue = cv2.getTrackbarPos('Hue', name)
		sat = cv2.getTrackbarPos('Sat', name)
		val = cv2.getTrackbarPos('Val', name)

		lower = np.array([hue-20,sat,val])
		upper = np.array([hue+20,255,255])

		mask = cv2.inRange(hsv, lower, upper)
		# blur=cv2.GaussianBlur(mask,(7,7),0)
		eroded = cv2.erode( mask, kernel, iterations=1)
		dilated = cv2.dilate( eroded, kernel, iterations=1)

		cv2.imshow(name, dilated)		

		k = cv2.waitKey(5) & 0xFF
		if k == ord(' '):
			cv2.destroyWindow(name)
			return np.array([[hue-20,sat,val],[hue+20,255,255]])
		elif k == ord('d'):
			cv2.destroyWindow(name)
			return def_range


def setCursorPos( yc, pyp):
	''' 
		This function is used to set the cursor position initially and also used to set the cursor position in the performAction().
		To reduce the shakiness in cursor, we make use of differential position allocation for the cursor. We compare the new centre with the 
		previous position of the cursor. If difference is less than 5 pixels, it is usually due to noise. 
		Thus the new cursor position is inclined more towards the previous one. However, a larger difference in previous position and new centre
		is considered as voluntary movement and the new cursor position is set close to the new centre.

		Args:
			 yc  -> Center of the yellow region
			 pyp -> previous position of the cursor.

		Returns:
			 yp which is the new cursor position.
	'''
	yp = np.zeros(2)
	
	if abs(yc[0]-pyp[0])<5 and abs(yc[1]-pyp[1])<5:
		yp[0] = yc[0] + .7*(pyp[0]-yc[0]) 
		yp[1] = yc[1] + .7*(pyp[1]-yc[1])
	else:
		yp[0] = yc[0] + .1*(pyp[0]-yc[0])
		yp[1] = yc[1] + .1*(pyp[1]-yc[1])
	
	return yp


def chooseAction(yp, rc, bc):
	''' 
		This function is used choose/set the appropriate action based on the position of the color's/object's centroid.
		Depending upon the relative positions of the three centroids, this function chooses whether the user desires free movement of cursor, 
		left click, right click or dragging.

		Args:
			 yp -> center of the yellow region
			 rc -> centroid of the red color region
			 bc -> centroid of the blue color region

		Returns:
			 out -> The output that contains the action that needs to be performed.
	'''
	out = np.array(['move', 'false'])
	if rc[0]!=-1 and bc[0]!=-1:
		
		if distance(yp,rc)<50 and distance(yp,bc)<50 and distance(rc,bc)<50 :
			out[0] = 'drag'
			out[1] = 'true'
			return out
		elif distance(rc,bc)<40: 
			out[0] = 'left'
			return out
		elif distance(yp,rc)<40:	
			out[0] = 'right'
			return out
		elif distance(yp,rc)>40 and rc[1]-bc[1]>120:
			out[0] = 'down'
			return out	
		elif bc[1]-rc[1]>110:
			out[0] = 'up'
			return out
		else:
			return out

	else:
		out[0] = -1
		return out 		


def performAction( yp, rc, bc, action, drag, perform):
	''' 
		This function is used to perform the action set in the chooseAction().
		The movement of the cursor on screen that is the left click, right click, scroll up, scroll down and dragging actions are performed 
		here based on value stored in 'action' variable.  

		Args:
			 yp      -> center of the yellow region
			 rc      -> centroid of the red color region
			 bc      -> centroid of the red color region
			 action  -> the action which you want to perform
			 drag    -> boolean variable used to set the drag action..
			 perform -> variable used to check whether you want to perform the action or not.

		Returns:

	'''

	if perform:
		cursor[0] = 4*(yp[0]-110)
		cursor[1] = 4*(yp[1]-120)
		if action == 'move':

			if yp[0]>110 and yp[0]<590 and yp[1]>120 and yp[1]<390:
				pyautogui.moveTo(cursor[0],cursor[1])
			elif yp[0]<110 and yp[1]>120 and yp[1]<390:
				pyautogui.moveTo( 8 , cursor[1])
			elif yp[0]>590 and yp[1]>120 and yp[1]<390:
				pyautogui.moveTo(1912, cursor[1])
			elif yp[0]>110 and yp[0]<590 and yp[1]<120:
				pyautogui.moveTo(cursor[0] , 8)
			elif yp[0]>110 and yp[0]<590 and yp[1]>390:
				pyautogui.moveTo(cursor[0] , 1072)
			elif yp[0]<110 and yp[1]<120:
				pyautogui.moveTo(8, 8)
			elif yp[0]<110 and yp[1]>390:
				pyautogui.moveTo(8, 1072)
			elif yp[0]>590 and yp[1]>390:
				pyautogui.moveTo(1912, 1072)
			else:
				pyautogui.moveTo(1912, 8)

		elif action == 'left':
			pyautogui.click(button = 'left')

		elif action == 'right':
			pyautogui.click(button = 'right')
			time.sleep(0.3)	

		elif action == 'up':
			pyautogui.scroll(5)


		elif action == 'down':
			pyautogui.scroll(-5)			


		elif action == 'drag' and drag == 'true':
			global y_pos
			drag = 'false'
			pyautogui.mouseDown()
		
			while(1):

				k = cv2.waitKey(10) & 0xFF
				changeStatus(k)

				_, frameinv = cap.read()
				# flip horizontaly to get mirror image in camera
				frame = cv2.flip( frameinv, 1)

				hsv = cv2.cvtColor( frame, cv2.COLOR_BGR2HSV)

				b_mask = makeMask( hsv, blue_range)
				r_mask = makeMask( hsv, red_range)
				y_mask = makeMask( hsv, yellow_range)

				py_pos = y_pos 

				b_cen = drawCentroid( frame, b_area, b_mask, showCentroid)
				r_cen = drawCentroid( frame, r_area, r_mask, showCentroid)	
				y_cen = drawCentroid( frame, y_area, y_mask, showCentroid)
			
				if 	py_pos[0]!=-1 and y_cen[0]!=-1:
					y_pos = setCursorPos(y_cen, py_pos)

				performAction(y_pos,r_cen, b_cen, 'move', drag, perform)					
				cv2.imshow('Frame', frame)

				if distance(y_pos,r_cen)>60 or distance(y_pos,b_cen)>60 or distance(r_cen,b_cen)>60:
					break

			pyautogui.mouseUp()


@app.route("/virtual-keyboard",methods=['GET'])
def keyboard():
	'''
		This function calls all the helper functions.
	'''
	if request.method == 'GET':

		# Some global variables or others that need prior intialization are initalized here
		
		# colour ranges for feeding to the inRange funtions
		blue_range = np.array([[88,78,20],[128,255,255]])
		yellow_range = np.array([[21,70,80],[61,255,255]])
		red_range = np.array([[158,85,72],[180 ,255,255]])

		# Prior initialization of all centers for safety
		b_cen, y_pos, r_cen = [240,320],[240,320],[240,320]
		
		

		# Area ranges for contours of different colours to be detected
		r_area = [100,1700]
		b_area = [100,1700]
		y_area = [100,1700]

		# Rectangular kernal for eroding and dilating the mask for primary noise removal 
		global kernel
		kernel = np.ones((7,7),np.uint8)

		# Status variables defined globally
		global perform
		perform = False
		global showCentroid
		showCentroid = False
		global cap
		cap = cv2.VideoCapture(0)

		print('**********************************************************************')
		print('	You have entered calibration mode.')
		print(' Use the trackbars to calibrate and press SPACE when done.')
		print('	Press D to use the default settings.')
		print('**********************************************************************')

		yellow_range = calibrateColor('Yellow', yellow_range)
		red_range = calibrateColor('Red', red_range)
		blue_range = calibrateColor('Blue', blue_range)
		print('	Calibration Successfull...')

		cv2.namedWindow('Frame')

		print('**********************************************************************')
		print('	Press P to turn ON and OFF mouse simulation.')
		print('	Press C to display the centroid of various colours.')
		print('	Press R to recalibrate color ranges.')
		print('	Press ESC to exit.')
		print('**********************************************************************')
		while(1):

			k = cv2.waitKey(10) & 0xFF
			changeStatus(k)


			_, frameinv = cap.read()
			# flip horizontaly to get mirror image in camera
			frame = cv2.flip( frameinv, 1)

			hsv = cv2.cvtColor( frame, cv2.COLOR_BGR2HSV)

			b_mask = makeMask( hsv, blue_range)
			r_mask = makeMask( hsv, red_range)
			y_mask = makeMask( hsv, yellow_range)

			py_pos = y_pos 

			b_cen = drawCentroid( frame, b_area, b_mask, showCentroid)
			r_cen = drawCentroid( frame, r_area, r_mask, showCentroid)	
			y_cen = drawCentroid( frame, y_area, y_mask, showCentroid)
			
			if 	py_pos[0]!=-1 and y_cen[0]!=-1 and y_pos[0]!=-1:
				y_pos = setCursorPos(y_cen, py_pos)

			output = chooseAction(y_pos, r_cen, b_cen)			
			if output[0]!=-1:
				performAction(y_pos, r_cen, b_cen, output[0], output[1], perform)	

			cv2.imshow('Frame', frame)

			if k == 27:
				break

		cap.release()
		cv2.destroyAllWindows()
		

		

@app.route("/lang-conv", methods=['POST', 'GET'])
def home():
	'''
		This is the function for the language translation functionality

		Args:
			 This is Flask API which takes text_to_translate and selected_language as input

		Returns:
			 This returns a JSON object which contains the translated text which is the text_to_translate converted into the selected_language.	 
	'''
	if request.method == 'POST':
		try:
			#retreiving text from the user
			obj=request.get_json()
			print(obj)
			text_to_translate = str(obj['text_to_translate'])

			#retreiving the language selected by the user
			selected_language =str( obj['select_language'])

			#detecting the language in which the user has entered the text is automatic
			translated_text = translator.translate(text_to_translate, lang_tgt=selected_language)

		except:
			translated_text = "Error. Please Try Again."

		#returning the translated text and the user's entered text back to the form to be displayed
		return {'translated_text':translated_text}


@app.route("/speech-to-txt",methods=['GET'])
def STT():
	'''
		This function is for speech to text fucntionality

		Args:
			 It uses the microphone to capture the voice input

		Returns:
			 It returns the text.
	'''
	if request.method == 'GET':
			
		with sr.Microphone() as source:
			print("Say something!")
			r.adjust_for_ambient_noise(source, duration = 1)
			audio = r.listen(source)
		
			try:
				# print the recognized audio in the text area
				my_text = r.recognize_google(audio)
				print("Converting speech to text..."+my_text)
				return {"text":my_text,'statusCode':200}
			except:
				return {"text":"Couldn't understand",'statusCode':422}

@app.route("/team")
def team():
	return render_template("team.html")


if __name__ == "__main__":
	app.run(debug=True)
