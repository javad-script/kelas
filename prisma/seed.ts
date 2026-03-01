/* eslint-disable no-console */
import { prisma } from '@/lib/prisma';

async function main() {
  const school = await prisma.school.create({
    data: {
      name: 'ایثار',
      phoneNumber: '09123456789',
      address: 'خیابان آزادی، تهران',
      about: 'مدرسه‌ای پیشرو در آموزش دانش‌آموزان با امکانات کامل و کادر مجرب.',
      email: 'info@isaar-school.ir',
      establishedYear: 1380,
      gradeLevel: 'ELEMENTARY',
      logo: '/uploads/logo.png',
      totalClasses: 12,
      type: 'PUBLIC',
      website: 'https://www.isaar-school.ir',
    },
  });
  console.log('school created successfully');
  const student1 = await prisma.user.upsert({
    where: { email: 'ali.student@example.com' },
    update: {},
    create: {
      email: 'ali.student@example.com',
      firstName: 'علی',
      lastName: 'احمدی',
      nationalCode: '0012345678',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO', // حتما رمز عبور هش شده باشه
      phone: '09123456780',
      role: 'STUDENT',
      username: 'ali.ahmadi',
      address: 'تهران، خیابان آزادی',
      birthDate: new Date('2008-03-15'),
      emergencyPhone: '09123456781',
      fatherEmail: 'father.ali@example.com',
      fatherJob: 'Engineer',
      fatherJobAddress: 'تهران، خیابان انقلاب',
      fatherJobPhone: '09123456782',
      fatherPhone: '09123456783',
      housePhone: '02112345678',
      motherEmail: 'mother.ali@example.com',
      motherJob: 'Teacher',
      motherJobAddress: 'تهران، خیابان ولیعصر',
      motherJobPhone: '09123456784',
      motherPhone: '09123456785',
      profileImage: '/uploads/profile/ali.jpg',
    },
  });
  const student2 = await prisma.user.upsert({
    where: { email: 'mina.student@example.com' },
    update: {},
    create: {
      email: 'mina.student@example.com',
      firstName: 'مینا',
      lastName: 'کاظمی',
      nationalCode: '0098765432',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO',
      phone: '09123456790',
      role: 'STUDENT',
      username: 'mina.kazemi',
      address: 'تهران، خیابان انقلاب',
      birthDate: new Date('2009-07-22'),
      emergencyPhone: '09123456791',
      fatherEmail: 'father.mina@example.com',
      fatherJob: 'Doctor',
      fatherJobAddress: 'تهران، خیابان شهید بهشتی',
      fatherJobPhone: '09123456792',
      fatherPhone: '09123456793',
      housePhone: '02187654321',
      motherEmail: 'mother.mina@example.com',
      motherJob: 'Nurse',
      motherJobAddress: 'تهران، خیابان ولیعصر',
      motherJobPhone: '09123456794',
      motherPhone: '09123456795',
    },
  });
  const student3 = await prisma.user.upsert({
    where: { email: 'ali2.student@example.com' },
    update: {},
    create: {
      email: 'ali2.student@example.com',
      firstName: 'علی',
      lastName: 'مرادی',
      nationalCode: '1100000001',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO',
      phone: '09120000011',
      role: 'STUDENT',
      username: 'ali.moradi',
      address: 'تهران',
      birthDate: new Date('2008-02-01'),
      emergencyPhone: '09120000012',
      fatherEmail: 'father1@example.com',
      fatherJob: 'کارمند',
      fatherJobAddress: 'تهران',
      fatherJobPhone: '09120000013',
      fatherPhone: '09120000014',
      housePhone: '02110000011',
      motherEmail: 'mother1@example.com',
      motherJob: 'خانه دار',
      motherJobAddress: 'تهران',
      motherJobPhone: '09120000015',
      motherPhone: '09120000016',
    },
  });

  const student4 = await prisma.user.upsert({
    where: { email: 'amir.student@example.com' },
    update: {},
    create: {
      email: 'amir.student@example.com',
      firstName: 'امیر',
      lastName: 'حسینی',
      nationalCode: '1100000002',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO',
      phone: '09120000021',
      role: 'STUDENT',
      username: 'amir.hosseini',
      address: 'تهران',
      birthDate: new Date('2008-03-01'),
      emergencyPhone: '09120000022',
      fatherEmail: 'father2@example.com',
      fatherJob: 'کارمند',
      fatherJobAddress: 'تهران',
      fatherJobPhone: '09120000023',
      fatherPhone: '09120000024',
      housePhone: '02110000021',
      motherEmail: 'mother2@example.com',
      motherJob: 'خانه دار',
      motherJobAddress: 'تهران',
      motherJobPhone: '09120000025',
      motherPhone: '09120000026',
    },
  });

  const student5 = await prisma.user.upsert({
    where: { email: 'mohammad.student@example.com' },
    update: {},
    create: {
      email: 'mohammad.student@example.com',
      firstName: 'محمد',
      lastName: 'کریمی',
      nationalCode: '1100000003',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO',
      phone: '09120000031',
      role: 'STUDENT',
      username: 'mohammad.karimi',
      address: 'تهران',
      birthDate: new Date('2008-04-01'),
      emergencyPhone: '09120000032',
      fatherEmail: 'father3@example.com',
      fatherJob: 'کارمند',
      fatherJobAddress: 'تهران',
      fatherJobPhone: '09120000033',
      fatherPhone: '09120000034',
      housePhone: '02110000031',
      motherEmail: 'mother3@example.com',
      motherJob: 'خانه دار',
      motherJobAddress: 'تهران',
      motherJobPhone: '09120000035',
      motherPhone: '09120000036',
    },
  });
  console.log('5 student user created successfully');

  const teacher = await prisma.user.upsert({
    where: { email: 'reza.teacher@example.com' },
    update: {},
    create: {
      email: 'reza.teacher@example.com',
      firstName: 'رضا',
      lastName: 'صادقی',
      nationalCode: '0023456789',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO', // رمز عبور هش شده
      phone: '09123456800',
      role: 'TEACHER',
      username: 'reza.sadeghi',
      address: 'تهران، خیابان آزادی',
      birthDate: new Date('1985-05-10'),
      emergencyPhone: '09123456801',
      fatherEmail: 'father.reza@example.com',
      fatherJob: 'Engineer',
      fatherJobAddress: 'تهران، خیابان انقلاب',
      fatherJobPhone: '09123456802',
      fatherPhone: '09123456803',
      housePhone: '02112345679',
      motherEmail: 'mother.reza@example.com',
      motherJob: 'Teacher',
      motherJobAddress: 'تهران، خیابان ولیعصر',
      motherJobPhone: '09123456804',
      motherPhone: '09123456805',
      profileImage: '/uploads/profile/reza.jpg',
    },
  });
  console.log('teacher user created successfully');
  const class1 = await prisma.classRoom.create({
    data: {
      grade: 12,
      name: 'دوازدهم شبکه و نرم افزار',
      schoolId: school.id,
    },
  });

  console.log('Class created successfully');

  await prisma.studentClass.createMany({
    data: [
      { classId: class1.id, studentId: student1.id },
      { classId: class1.id, studentId: student2.id },
      { classId: class1.id, studentId: student3.id },
      { classId: class1.id, studentId: student4.id },
      { classId: class1.id, studentId: student5.id },
    ],
    skipDuplicates: true,
  });

  console.log('students and classes relations created successfully');

  await prisma.schoolUser.createMany({
    data: [
      {
        role: 'STUDENT',
        schoolId: school.id,
        userId: student1.id,
      },
      {
        role: 'STUDENT',
        schoolId: school.id,
        userId: student2.id,
      },
      {
        role: 'STUDENT',
        schoolId: school.id,
        userId: student3.id,
      },
      {
        role: 'STUDENT',
        schoolId: school.id,
        userId: student4.id,
      },
      {
        role: 'STUDENT',
        schoolId: school.id,
        userId: student5.id,
      },
      {
        role: 'TEACHER',
        schoolId: school.id,
        userId: teacher.id,
      },
    ],
  });

  console.log('students and schools relations created successfully');

  console.log('teacher and schools relations created successfully');

  const lesson = await prisma.lesson.create({ data: { image: '', name: 'فارسی ۳' } });

  console.log('lesson created successfully');

  await prisma.lessonClass.create({
    data: { classId: class1.id, teacherId: teacher.id, lessonId: lesson.id },
  });

  console.log('lesson and class relations created successfully');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
