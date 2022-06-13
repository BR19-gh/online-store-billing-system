#####################
###### Imports ######
#####################
import base64
#########################
###### Imports END ######
#########################

###################
###### Other ######
###################
def render_picture(data):

    render_pic = base64.b64encode(data).decode('ascii')
    return render_pic
#######################
###### Other END ######
#######################