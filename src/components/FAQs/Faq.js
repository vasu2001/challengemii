import React from 'react';
import './faq.css';
import { BsArrowRight } from 'react-icons/bs';
const Faq = () => {
   return (
      <div className="faq-container">
         <ul>
            <li>What is Challengemii ?</li>
            <li>
               <BsArrowRight /> The Challengemii Website is a platform for
               people talented in various categories like Writing , Painting ,
               Photography etc. to come together and showcase their talent .
               People can take part in various competitions organised for
               various talent category. People can vote for deserving
               participate to appreciate the work of exceptional talent and earn
               money . Through this platform we intent to discover talent and
               recognise it. So, if you think you have some talent then you have
               come to the right place. Don't hide your talents, get ready to
               show them to the world!
            </li>
         </ul>
         <ul>
            <li>How can I register ?</li>
            <li>
               <BsArrowRight /> Registering to Challengemii is very easy. You
               can view competitions details without registering .You can click
               on signup button to sign up . You currently have 3 options:{' '}
               <br />
               <br />
               1. Register using gmail/google account. When you choose gmail
               option, your gmail credentials is used for registration.
               <br></br>
               2.Register using your Facebook I'd. When you choose the Facebook
               option, your Facebook credentials is used for registration.{' '}
               <br />
               3. Register using your Twitter . When you choose the Twitter
               option , your Twitter credentials is used for registration.{' '}
               <br />
            </li>
         </ul>
         <ul>
            <li>How can I take part in a competition?</li>
            <li>
               <BsArrowRight />
               In the COMPETITION section ,you will be able to see the current
               competitions as well as upcoming competition . You can
               participate before timer ends. You will be able to participate
               for that competition by clicking on the participate button . You
               would need to pay registration fee as 'Tickets' which you can buy
               using ticket button . You should throughly read competition
               instructions before submitting your entry .
            </li>
         </ul>
         <ul>
            <li>Where can I view my previous competition entries ?</li>
            <li>
               <BsArrowRight />
               You can see your previous competition entries in your profile .
            </li>
         </ul>
         <ul>
            <li>Why voter cannot see leaderboard ?</li>
            <li>
               <BsArrowRight />
               Voters cannot see leaderboard for fair practice. They can give
               mention number of vote to deserving participants whom they think
               deserve to win
            </li>
         </ul>
         <ul>
            <li>How can I earn through voting ?</li>
            <li>
               <BsArrowRight />
               You can only give mention number of vote to deserving
               participates whom you think deserves to win. When the final
               leaderboard shown on final day of competition , their deserving
               participates matches the top winners . They will earn money. For
               example : if 4 votes is allowed in competition then top 4 winner
               will be consider.
            </li>
         </ul>
         <ul>
            <li>How can I redeem money?</li>
            <li>
               <BsArrowRight />
               You can redeem money 'coins' for various products listed on our
               redeem page as well as for Cash having minimum limit of ₹1000.
            </li>
         </ul>
         <ul>
            <li>How to change my name or photo on Challengemii?</li>
            <li>
               <BsArrowRight />
               To do so, go to your profile on Challengemii Tap on your profile
               photo and you will see an option to edit photo . Click on choose
               file and submit your profile photo.
               <br />
               To change your name , go to your profile on Challengemii. Click
               on edit icon , now you can change your name and save it . You can
               repeat this process as many times as you want .
            </li>
         </ul>
         <ul>
            <li>How can I confirm my redeem request ?</li>
            <li>
               <BsArrowRight />
               You will get confirm order details within 24-48 hours on your
               email .
            </li>
         </ul>
         <ul>
            <li>When will I get my redeem product ?</li>
            <li>
               <BsArrowRight />
               Your redeem product dispatching, shipping time can take 7-8
               working days . You will get details of order in confirmation
               email of your order .
            </li>
         </ul>
         <ul>
            <li>How will winner be verify ?</li>
            <li>
               <BsArrowRight />
               Challengemii is strictly against any kind of unfair activities.
               Winner will be ask to prove that he/ she has not adopted any kind
               of unfair means . He/she will be ask to prove competition entry
               belongs to him/her by sending his/ her photo along with it .
            </li>
         </ul>
         <ul>
            <li>When will I get my redeem cash?</li>
            <li>
               <BsArrowRight />
               Cash will be credited in your desired payment mode in 24-48 hours
               .
            </li>
         </ul>
      </div>
   );
};

export default Faq;
