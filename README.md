<p align="center">
    <img src="images/chair256.png" alt="PostSure" width="72" height="72">
</p>

<h3 align="center">PostSure</h3>

<p align="center">
    Analyze, monitor, and maintain your posture — all throughout the day.
    <br>
    <a href="https://linktr.ee/suket_shah"><strong>Link Tree »</strong></a>
</p>

<h3>Inspiration</h3>
<p>With research describing that 55 percent of people experience back pain due to working from home and COVID-19 causing everyday individuals to spend more time in front of their screens, posture has become more of an issue than ever. Poor back posture is equivalent to adding 8 kilograms of weight on one’s neck and shoulders. We intend to provide a simple solution for everyday people to be aware of their poor sitting posture and work to correct it over time.</p>

<h3>What it does</h3>
Our Google Chrome extension analyzes a person’s posture during a computer session and through computer vision, alerts the user with a notification if the user alters to a poor posture. The user is prompted to fix their posture and continue their work, building a habit in the user to be aware of proper sitting posture.

<h3>How we built it</h3>
<p>We utilized PoseNet, a pose recognition model, to track and ensure that the user's posture doesn't deviate from the initial proper position. If the user's position deviates beyond a threshold during the session, they are notified that their posture is unhealthy. Various points on the body (shoulders, ears, and nose) are constantly obtained in frames and are compared to the calibration points. Whenever a posture exceeds a threshold, PostSure prompts the user to sit upright. Percentages about how proper the user’s posture collected and collated into a line graph that can be displayed to the user at any time. We hosted this in a web app employing JavaScript/HTML for the frontend and Google Firestore for the backend. Storing percentages after each session into Firestore allows the user to view a line graph with data from all previous sessions, showing sitting posture improvement in the user.</p>

<h3>Challenges we ran into</h3>
<p>Initially, we had trouble getting a video feed from the extension pop-up, because the correct permissions weren’t able to be set. We had to find a workaround that used the options page as a middle man to obtain the correct permissions from the user. Other major challenges derived from integrating the PoseNet model into our application, specifically with accurately mapping the points to the user as well as implementing the thresholds accurately. Eventually, we realized the issue was due to the video display being mirrored and added transformations to the elements to ensure the points were properly matched. We exhaustively searched to determine ideal horizontal and vertical thresholds for every point.</p>

<h3>Accomplishments that we're proud of</h3>
<p>We are ecstatic to be able to present a fully-functioning web app that integrates a JavaScript frontend and a Firestore backend while utilizing computer vision. Our satisfaction derives from the fact that PostSure is a relatively simple tool that can produce a significant change in one’s spine health. Furthermore, being able to display data of an individual’s sitting posture over the course of a session and over numerous weeks allows the user to understand how their posture improved over time.</p>

<h3>What we learned</h3>
<p>We learned how to integrate Firebase Firestore with JavaScript while employing it all into the framework behind a Google Chrome extension. Being able to mesh these various tools to produce a product provided the team with a deeper understanding of full-stack development. Additionally, we picked up various tactics when combining statistics with our data collection in order to present the user with their posture data.</p>

<h3>What's next for PostSure</h3>
<p>We wish to extend PostSure to be able to provide more detailed statistics about the user’s sitting posture during a session and we plan to create a more personalized interface where users can customize what statistics they wish to view. We would also like to ensure the posture is fixed after the notification by either blocking the screen until the posture is fixed or preventing the user from continuing to work.</p>

<h3>Contributors</h3>
    <p><ul>
    <li>Soham Patel</li>
    <li>Kaustub Navalady</li>
    <li>Shikhar Gupta</li>
    <li>Suket Shah</li>
    <li>Sanchith Shanmuga</li>
    </ul></p>

