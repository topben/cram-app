// declare realm_model
var realm_model = [];

// declare related schemas for realm
var user_schema = {
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
    }
}

var notification_schema ={
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
  }
}

var course_schema = {
  name: 'CourseModel',
  primaryKey: 's_course_id',
  properties: {
      s_course_id: {type: 'string', default: ''},
      s_name: {type: 'string', default: ''},
      i_frequency: {type: 'int', default: 0},
      s_period: {type: 'string', default: ''},
      students: {type: 'list', objectType: 'myString'},
      b_isDelete: {type: 'bool', default: false}
  }
}

var myString_schema = {
  name: 'myString',
  properties: {
      string: {type: 'string', default: ''},
  }
}

var student_schema = {
  name: 'StudentModel',
  primaryKey: 's_student_id',
  properties: {
      s_student_id: {type: 'string', default: ''},
      s_organization_id: {type: 'string', default: ''},
      s_phone: {type: 'string', default: ''},
      s_email: {type: 'string', default: ''},
      s_qr_code_id: {type: 'string', default: ''},
      s_name: {type: 'string', default: ''},
      s_organization_role: {type: 'string', default: ''},
      s_profile_picture_url: {type: 'string', default: ''},
      b_isDelete: {type: 'bool', default: false}
  }
}

var attendance_schema = {
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
  }
}

var klass_schema = {
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
  }
}

var people_schema = {
  name: 'People',
  properties: {
    s_phone: 'string',
    s_verificationCode: 'string',
    s_email: 'string'
  }
}

var synchronization_schema = {
  name: 'SynchronizationModel',
  primaryKey: 'i_table_id',
  properties: {
    i_table_id: {type: 'int', default: 0},
    s_table_name: {type: 'string', default: ''},
    i_last_updated_at: {type: 'int', default: 0},
  }
}

// push array
realm_model.push(user_schema);
realm_model.push(notification_schema);
realm_model.push(course_schema);
realm_model.push(student_schema);
realm_model.push(attendance_schema);
realm_model.push(klass_schema);
realm_model.push(people_schema);
realm_model.push(synchronization_schema);
realm_model.push(myString_schema);

// export
module.exports =  realm_model;
