# fast_and_curious
login : admin
password: admin
http://localhost5000:5000/admin/clinics(post name: Add clinic, get: All clinics)
http://localhost5000:5000/admin/clinics/:id(post name: Add doctor to clinic, get: Single clinic, his doctors and services which provided)

http://localhost5000:5000/admin/doctors(post name: Add doctor, get: All doctors)
http://localhost5000:5000/admin/doctors/:id(post name: Add speciality to doctor, get: Single Doctor, his speciality and clinics)

http://localhost5000:5000/admin/services(post speciality: Add speciality, get: All specialities)

http://localhost5000:5000/auth(post: Enter to account and get tokens)
http://localhost5000:5000/auth/refreshToken(post: Get new tokens)
