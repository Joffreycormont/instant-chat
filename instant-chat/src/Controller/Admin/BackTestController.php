<?php

namespace App\Controller\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BackTestController extends AbstractController
{
    /**
     * @Route("/admin/back/test", name="admin_back_test")
     */
    public function index()
    {
        return $this->render('admin/back_test/index.html.twig', [
            'controller_name' => 'BackTestController',
        ]);
    }
}
