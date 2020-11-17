<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;



class HomeController extends AbstractController
{

    /**
     * @Route("/new/message", name="newMessage", methods={"POST"})
     */
    public function newMessage(PublisherInterface $publisher, Request $request): Response
    {
        $user = $this->getUser()->getUsername();

        $newMessage = $request->request->get('message');

        $data= [
            "user" => $user,
            "content" => $newMessage
        ];

        $update = new Update(
            'http://127.0.0.1:8000/messages',
            json_encode($data)
        );

        // The Publisher service is an invokable object
        $publisher($update);

        return new Response('new message published!');
    }

    /**
     * @Route("/", name="home")
     */
    public function index(PublisherInterface $publisher)
    {
        $user = $this->getUser();

        $data= [
            "user" => $user->getUsername(),
            "content" => 'Un nouvel utilisateur vient de se connecter...'
        ];

        $update = new Update(
            'http://127.0.0.1:8000/messages',
            json_encode($data)
        );

        // The Publisher service is an invokable object
        $publisher($update);

        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'user' => $user
        ]);
    }
}
