const UserSchema = {
    name: 'User',
    primaryKey: 'i_user_id',
    properties: {
        i_user_id: {type: 'int', default: 0},
        s_name: {type: 'string', default: ''},
        s_username: {type: 'string', default: ''},
        s_password: {type: 'string', default: ''},
        s_email: {type: 'string', default: ''},
        s_phone: {type: 'string', default: ''},
        s_invitationCode: {type: 'string', default: ''},
        s_permission: {type: 'string', default: ''},
        i_scannerUsage: {type: 'int', default: 0},
        s_profileImage: {type: 'string', default: ''},
        b_isTeacher: {type: 'bool', default: false},
        b_isParent: {type: 'bool', default: false},
        b_isDelete: {type: 'bool', default: false}
    },
};

const CourseSchema = {
    name: 'Course',
    primaryKey: 'i_course_id',
    properties: {
        i_course_id: {type: 'int', default: 0},
        s_name: {type: 'string', default: ''},
        s_dayOfTheWeek: {type: 'string', default: ''},
        s_company: {type: 'string', default: ''},
        NSDate_startTime: {type: 'date', optional: true},
        NSDate_endTime: {type: 'date', optional: true},
        NSDate_checkInTime: {type: 'date', optional: true},
        NSDate_lateTime: {type: 'date', optional: true},
        User_instructor: {type: 'UserModel', optional: true},
        List_students: {type: 'list', objectType: 'StudentModel'},
        b_isDelete: {type: 'bool', default: false}
    },
};

 const StudentSchema = {
     name: 'Student',
     primaryKey: 'i_student_id',
     properties: {
         i_student_id: {type: 'int', default: 0},
         s_name: {type: 'string', default: ''},
         s_student_qrCode: {type: 'string', default: ''},
         s_profileImage: {type: 'string', default: ''},
         List_courses: {type: 'list', objectType: 'CourseModel'},
         List_checkInHistory: {type: 'list', objectType: 'AttendanceModel'},
         b_isDelete: {type: 'bool', default: false}
     },
 };

 const AttendanceSchema = {
     name: 'Attendance',
     primaryKey: 'i_attendance_id',
     properties: {
         i_attendance_id: {type: 'int', default: 0},
         i_course_id: {type: 'int', default: 0},
         NSDate_date: {type: 'date', optional: true},
         b_attend: {type: 'bool', default: false},
         b_leave: {type: 'bool', default: false},
         b_isDelete: {type: 'bool', default: false}
     },
 };
