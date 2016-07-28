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
//
// CourseSchema : {
//     name: 'Course',
//     primaryKey: 'i_course_id',
//     properties: {
//         i_course_id: {type: 'int', default: 0},
//         s_name: {type: 'string', default: ''},
//         s_dayOfTheWeek: {type: 'string', default: ''},
//         s_company: {type: 'string', default: ''},
//         NSDate_startTime: {type: 'date', optional: true},
//         NSDate_endTime: {type: 'date', optional: true},
//         NSDate_checkInTime: {type: 'date', optional: true},
//         NSDate_lateTime: {type: 'date', optional: true},
//         User_instructor: {type: 'UserModel', optional: true},
//         List_students: {type: 'list', objectType: 'StudentModel'},
//         b_isDelete: {type: 'bool', default: false}
//     },
// },
// StudentSchema : {
//      name: 'Student',
//      primaryKey: 'i_student_id',
//      properties: {
//          i_student_id: {type: 'int', default: 0},
//          s_name: {type: 'string', default: ''},
//          s_student_qrCode: {type: 'string', default: ''},
//          s_profileImage: {type: 'string', default: ''},
//          List_courses: {type: 'list', objectType: 'CourseModel'},
//          List_checkInHistory: {type: 'list', objectType: 'AttendanceModel'},
//          b_isDelete: {type: 'bool', default: false}
//      },
//  },
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
