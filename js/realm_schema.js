module.exports = {
UserModel : {
    name: 'UserModel',
    primaryKey: 's_user_id',
    properties: {
        s_user_id: {type: 'string', default: ''},
        s_name: {type: 'string', default: ''},
        s_password: {type: 'string', default: ''},
        s_email: {type: 'string', default: ''},
        s_phone: {type: 'string', default: ''},
        s_country: {type: 'string', default: ''},
        s_profileImage: {type: 'string', default: ''},
        s_invitationCode: {type: 'string', default: ''},
        s_role: {type: 'string', default: ''},
        s_access_token: {type: 'string', default: ''},
        s_refresh_token: {type: 'string', default: ''},
        s_token_type: {type: 'string', default: ''},
        i_updateTimestamp: {type: 'int', default: 0},
        i_scannerUsage: {type: 'int', default: 0},
        i_created_at: {type: 'int', default: 0},
        i_updated_at: {type: 'int', default: 0},
        i_deleted_at: {type: 'int', default: 0},
        s_profile_picture_file_name: {type: 'string', default: ''},
        i_profile_picture_updated_at: {type: 'int', default: 0},
    },
},

NotificationModel : {
  name: 'NotificationModel',
  primaryKey: 's_notification_id',
  properties: {
          s_notification_id : {type: 'string', default: ''},
          b_isRead         : {type: 'bool',   default: false},
          i_created_at     : {type: 'int',    default: 0},
          s_teacher_id     : {type: 'string', default: ''},
          s_course_id      : {type: 'string', default: ''},
          s_student_id     : {type: 'string', default: ''},
          check_in_method  : {type: 'string', default: ''},
          s_status         : {type: 'string', default: ''},
          b_isDelete       : {type: 'bool',   default: false},
  },
},

CourseModel : {
    name: 'CourseModel',
    primaryKey: 's_course_id',
    properties: {
        s_course_id: {type: 'string', default: ''},
        s_name: {type: 'string', default: ''},
        i_frequency: {type: 'int', default: 0},
        s_period: {type: 'string', default: ''},
        b_isDelete: {type: 'bool', default: false}
    },
},

StudentModel : {
     name: 'StudentModel',
     primaryKey: 's_student_id',
     properties: {
         s_student_id: {type: 'string', default: ''},
         s_student_qrCode: {type: 'string', default: ''},
         s_name: {type: 'string', default: ''},
         s_group_role: {type: 'string', default: ''},
         b_isDelete: {type: 'bool', default: false}
     },
 },

// AttendanceSchema : {
//      name: 'Attendance',
//      primaryKey: 'i_attendance_id',
//      properties: {
//          i_attendance_id: {type: 'int', default: 0},
//          i_course_id: {type: 'int', default: 0},
//          NSDate_date: {type: 'date', optional: true},
//          b_attend: {type: 'bool', default: false},
//          b_leave: {type: 'bool', default: false},
//          b_isDelete: {type: 'bool', default: false}
//      },
//  },

 People : {
  name: 'People',
  properties: {
    s_phone: 'string',
    s_verificationCode: 'string',
    s_email: 'string'
  }
}
}
