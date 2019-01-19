<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController{

    /**
     * @Route("/", name="home")
     */
    public function home(){
        return $this->render('views/home.html.twig', ['title' => 'Home']);
    }
    
    /**
     * @Route("/flags", name="flags")
     */
    public function flags(){
        return $this->render('views/flags.html.twig', ['title' => 'Drapeaux']);
    }
    
    /**
     * @Route("/list", name="listePays")
     */
    public function listePays(){
        return $this->render('views/listPays.html.twig', ['title' => 'Pays']);
    }
}