#!/usr/bin/env python
__author__ = 'flier'
import rospy
import leap_interface
from leap_motion.msg import leap
from leap_motion.msg import leapros
from leap_motion.msg import raven_automove

def talker():
    pub = rospy.Publisher('chatter', raven_automove, queue_size=10)
    rospy.init_node('talker', anonymous=True)
    r = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
        msg=raven_automove()
        rospy.loginfo(msg)
        pub.publish(msg)
        r.sleep()

if __name__ == '__main__':
    try:
        talker()
    except rospy.ROSInterruptException: pass

