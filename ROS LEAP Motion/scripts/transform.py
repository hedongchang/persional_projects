#!/usr/bin/env python
__author__ = 'flier'

import rospy
from leap_motion.msg import leap
from leap_motion.msg import leapros
from leap_motion.msg import raven_automove

# Native datatypes, I've heard this is bad practice, use the geometry messages instead.
# def callback(data):
#    rospy.loginfo(rospy.get_name() + ": Leap Raw Data %s" % data)


# Callback of the ROS subscriber, just print the received data.
def callback_ros(data):
    msg = raven_automove()
    msg.del_pos[0]=int(data.palmpos.x*1000000)
    msg.del_pos[1]=int(data.palmpos.y*1000000)
    msg.del_pos[2]=int(data.palmpos.z*1000000)
    #msg.tf_incr.translation.x=a
    #msg.tf_incr.translation.y=b
    #msg.tf_incr.translation.z=c
    #rospy.loginfo(rospy.get_name() + ": Leap ROS Data %s" % msg)


# Yes, a listener aka subscriber ;) obviously. Listens to: leapmotion/data
def listener():
    rospy.init_node('leapraven', anonymous=True)
    # rospy.Subscriber("leapmotion/raw", leap, callback)
    rospy.Subscriber("leapmotion/data", leapros, callback_ros)
    rospy.spin()

def output():
    pub = rospy.Publisher('leap2raven', raven_automove, queue_size=10)
    #rospy.init_node('leap_to_raven', anonymous=True)
    r = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        rospy.loginfo(msg)
        pub.publish(msg)
        r.sleep()


if __name__ == '__main__':
    listener()
    try:
        output()
    except rospy.ROSInterruptException: 
        rospy.loginfo("talker didn't work")
        pass





