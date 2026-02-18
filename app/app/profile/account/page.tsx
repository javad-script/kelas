'use client';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Page() {
  const [openItem, setOpenItem] = useState<string>('personal'); // همیشه "personal" بازه

  return (
    <>
      <form method='post'>
        <Accordion
          type='single'
          value={openItem}
          onValueChange={(value) => {
            // اگر کاربر بخواد "personal" رو ببنده، دوباره بازش کنیم
            if (!value || value === '') {
              setOpenItem('personal');
            } else {
              setOpenItem(value);
            }
          }}
        >
          <AccordionItem value='personal'>
            <AccordionTrigger>اطلاعات فردی</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value='father'>
            <AccordionTrigger>اطلاعات پدر</AccordionTrigger>
            <AccordionContent>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, totam recusandae!
                Voluptatem magnam consectetur facere, nisi temporibus nesciunt saepe optio numquam
                dolore. Rem neque debitis illum, fugiat corporis commodi alias, sequi quisquam
                provident amet at est architecto quasi laborum ut molestias sit ea mollitia minus
                labore odio aperiam odit! Dolorem?
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='mother'>
            <AccordionTrigger>اطلاعات مادر</AccordionTrigger>
            <AccordionContent>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, totam recusandae!
                Voluptatem magnam consectetur facere, nisi temporibus nesciunt saepe optio numquam
                dolore. Rem neque debitis illum, fugiat corporis commodi alias, sequi quisquam
                provident amet at est architecto quasi laborum ut molestias sit ea mollitia minus
                labore odio aperiam odit! Dolorem?
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </>
  );
}
