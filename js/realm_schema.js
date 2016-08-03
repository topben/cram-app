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
        i_login_at: {type: 'int', default: 0},
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
          i_created_at      : {type: 'int',    default: 0},
          s_teacher_id      : {type: 'string', default: ''},
          s_course_id       : {type: 'string', default: ''},
          s_student_id      : {type: 'string', default: ''},
          s_announcement_id : {type: 'string', default: ''},
          s_message_id      : {type: 'string', default: ''},
          s_invitation_id   : {type: 'string', default: ''},
          s_attendance_id   : {type: 'string', default: ''},
          s_check_in_method : {type: 'string', default: ''},
          s_status          : {type: 'string', default: ''},
          s_type            : {type: 'string', default: ''},
          b_isRead          : {type: 'bool',   default: false},
          b_isDelete        : {type: 'bool',   default: false},
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
         s_profile_picture_url: {type: 'string', default: ''},
         b_isDelete: {type: 'bool', default: false}
     },
 },

AttendanceModel : {
     name: 'AttendanceModel',
     primaryKey: 's_attendance_id',
     properties: {
         s_attendance_id: {type: 'string', default: ''},
         s_klass_id: {type: 'string', default: ''},
         s_student_id: {type: 'string', default: ''},
         s_teacher_id: {type: 'string', default: ''},
         s_check_in_method: {type: 'string', default: ''},
         s_status: {type: 'string', default: ''},
         i_arrived_at: {type: 'int', default: 0},
         b_isDelete: {type: 'bool', default: false}
     },
 },

 KlassModel : {
      name: 'KlassModel',
      primaryKey: 's_klass_id',
      properties: {
          s_klass_id: {type: 'string', default: ''},
          s_course_id: {type: 'string', default: ''},
          s_teacher_id: {type: 'string', default: ''},
          s_location: {type: 'string', default: ''},
          i_start_date: {type: 'int', default: 0},
          i_end_date: {type: 'int', default: 0},
          b_isDelete: {type: 'bool', default: false}
      },
 },

 People : {
  name: 'People',
  properties: {
    s_phone: 'string',
    s_verificationCode: 'string',
    s_email: 'string'
  }
}
}
