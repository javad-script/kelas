import { prisma } from '@/lib/prisma';

async function main() {
  const school1 = await prisma.school.create({
    data: {
      name: 'ایثار',
      phoneNumber: '09123456789',
      address: 'خیابان آزادی، تهران',
      about: 'مدرسه‌ای پیشرو در آموزش دانش‌آموزان با امکانات کامل و کادر مجرب.',
      bannerImage: '/uploads/banner.jpg',
      email: 'info@isaar-school.ir',
      establishedYear: 1380,
      gradeLevel: 'ELEMENTARY',
      logo: '/uploads/logo.png',
      totalClasses: 12,
      type: 'PUBLIC',
      website: 'https://www.isaar-school.ir',
    },
  });
  const school2 = await prisma.school.create({
    data: {
      name: 'پیشرفت',
      phoneNumber: '09987654321',
      address: 'خیابان انقلاب، تهران',
      about: 'مدرسه‌ای با تمرکز بر علوم و فناوری و فعالیت‌های فوق برنامه متنوع.',
      bannerImage: '/uploads/banner2.jpg',
      email: 'contact@pishraft-school.ir',
      establishedYear: 1390,
      gradeLevel: 'MIDDLE',
      logo: '/uploads/logo2.png',
      totalClasses: 15,
      type: 'PRIVATE',
      website: 'https://www.pishraft-school.ir',
    },
  });
  console.log('two school added');
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
      profileImage: '/uploads/ali.jpg',
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
      profileImage: '/uploads/mina.jpg',
    },
  });
  console.log('two student added');

  const teacher1 = await prisma.user.upsert({
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
      profileImage: '/uploads/reza.jpg',
    },
  });
  const teacher2 = await prisma.user.upsert({
    where: { email: 'sara.teacher@example.com' },
    update: {},
    create: {
      email: 'sara.teacher@example.com',
      firstName: 'سارا',
      lastName: 'کریمی',
      nationalCode: '0034567890',
      password: '$2b$12$5nc.37jic5A457xqqB97O.tsPNsfIX0yPNNZJx8smD6ev950UIQkO',
      phone: '09123456810',
      role: 'TEACHER',
      username: 'sara.karimi',
      address: 'تهران، خیابان انقلاب',
      birthDate: new Date('1990-08-22'),
      emergencyPhone: '09123456811',
      fatherEmail: 'father.sara@example.com',
      fatherJob: 'Doctor',
      fatherJobAddress: 'تهران، خیابان شهید بهشتی',
      fatherJobPhone: '09123456812',
      fatherPhone: '09123456813',
      housePhone: '02187654322',
      motherEmail: 'mother.sara@example.com',
      motherJob: 'Nurse',
      motherJobAddress: 'تهران، خیابان ولیعصر',
      motherJobPhone: '09123456814',
      motherPhone: '09123456815',
      profileImage: '/uploads/sara.jpg',
    },
  });
  console.log('two teacher added');
  // 1️⃣ هر کلاس به یک مدرسه وصل می‌شود
  const class1 = await prisma.classRoom.create({
    data: {
      grade: 12,
      name: 'Class 1',
      schoolId: school1.id,
    },
  });

  const class2 = await prisma.classRoom.create({
    data: {
      grade: 10,
      name: 'Class 2',
      schoolId: school2.id,
    },
  });

  // 2️⃣ اتصال معلم‌ها به کلاس‌ها (Many-to-Many)
  await prisma.classTeacher.createMany({
    data: [
      { teacherId: teacher1.id, classId: class1.id },
      { teacherId: teacher2.id, classId: class2.id },
      { teacherId: teacher1.id, classId: class2.id }, // مثال کلاس با دو معلم
    ],
  });

  await prisma.classRoom.update({
    where: { id: class1.id },
    data: {
      students: { connect: [{ id: student1.id }, { id: student2.id }] },
    },
  });
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
