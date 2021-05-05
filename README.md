# fast_and_curious
login : admin
password: admin
http://localhost5000:5000/admin/clinics(
  post name: Add clinic, for example=> "name" "Kyiv Municipal Clinic #5"
  get: All clinics
)

http://localhost5000:5000/admin/clinics?name=Roman&speciality=cardiology(
  get: All clinics where name is Roman and speciality is cardiology
)
http://localhost5000:5000/admin/clinics/:id(
  post name: Add doctor to clinic, for exapmle => "name": "Jonny Sins"
  get: Single clinic, his doctors and services which provided
)

http://localhost5000:5000/admin/doctors(
  post name: Add doctor, for example => "name": "Volodymyr Zelenskiy"
  get: All doctors
)
http://localhost5000:5000/admin/doctors/:id(
  post name: Add speciality to doctor, for example: => "speciality": "cardiology"
  get: Single Doctor, his speciality and clinics
)

http://localhost5000:5000/admin/services(
  post speciality: Add speciality, for example => "speciality": "cardiology"
  get: All specialities
)

http://localhost5000:5000/auth(post: Enter to account and get tokens)
http://localhost5000:5000/auth/refreshToken(post: Get new tokens)
